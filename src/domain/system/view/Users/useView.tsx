import { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useModal } from '../../../../shared/hooks/useModal'
import { type PermissionModel } from '../../../auth/types/permission'
import { type UserModel } from '../../../auth/types/user'
import { type UsersPermissionsFormValues } from '../../components/Users/UsersList/types'
import { UserEmitter } from '../../events/UserEmitter'
import useGetAllPermissionsService from '../../services/getAllPermissionsService'
import useGetAllUsersService from '../../services/getAllUsersService'
import {
  parseFormValues,
  setUsersPermissionsService,
} from '../../services/setUsersPermissionsService'

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
    const { error } = await setUsersPermissionsService(parseFormValues(values))
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
