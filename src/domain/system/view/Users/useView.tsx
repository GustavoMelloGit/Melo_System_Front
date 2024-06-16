import { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { deepCleanObject } from '../../../../lib/utils/deepCleanObject'
import objectEntries from '../../../../lib/utils/objectEntries'
import { useModal } from '../../../../shared/hooks/useModal'
import { type HttpMethods } from '../../../../shared/types/HttpMethods'
import { type PermissionModel } from '../../../auth/types/permission'
import { type UserModel } from '../../../auth/types/user'
import { type UsersPermissionsFormValues } from '../../components/Users/UsersList/types'
import { UserEmitter } from '../../events/UserEmitter'
import { SystemService } from '../../services/SystemService'
import { type UserPermissionData } from '../../services/SystemService.dto'
import {
  useGetAllPermissionsService,
  useGetAllUsersService,
} from '../../services/SystemService.hooks'

function parseFormValues(values: UsersPermissionsFormValues): UserPermissionData[] {
  const userPermissionData: UserPermissionData[] = []
  const cleanValues = deepCleanObject(values)
  objectEntries(cleanValues).forEach(([userId, routes]) => {
    const userData: UserPermissionData = {
      id: userId,
      permissions: routes
        ? objectEntries(routes)
            .filter(([_, value]) => Boolean(value))
            .map(([route]) => {
              const [method, routeName] = route.split('%') as [HttpMethods, string]
              return { method, route: routeName }
            })
        : [],
    }
    userPermissionData.push(userData)
  })

  return userPermissionData
}

export default function useUsersView(): UseUsersView {
  const { data: users, isLoading: usersIsLoading, mutate: mutateUsers } = useGetAllUsersService()
  const { data: permissions } = useGetAllPermissionsService()
  const openModal = useModal((state) => state.openModal)

  async function handleAddUser(): Promise<void> {
    const AddUser = (await import('../../components/Users/AddUser')).default
    openModal(<AddUser />)
  }

  const refetch = useCallback(async () => {
    await mutateUsers()
  }, [mutateUsers])

  async function handleUpdateUsersPermissions(values: UsersPermissionsFormValues): Promise<void> {
    const { error } = await SystemService.setUsersPermissions(parseFormValues(values))
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Permissões alteradas com sucesso!')
    await refetch()
  }

  useEffect(() => {
    UserEmitter.on('userCreated', refetch)
    return () => {
      UserEmitter.off('userCreated', refetch)
    }
  }, [refetch])

  return {
    users: users ?? [],
    isLoading: usersIsLoading,
    handleAddUser,
    permissions: permissions ?? [],
    handleUpdateUsersPermissions,
  }
}

export type UseUsersView = {
  users: UserModel[]
  isLoading: boolean
  handleAddUser: () => Promise<void>
  permissions: PermissionModel[]
  handleUpdateUsersPermissions: (values: UsersPermissionsFormValues) => Promise<void>
}
