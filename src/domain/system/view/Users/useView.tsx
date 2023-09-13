import { useCallback, useEffect } from 'react'
import { useModal } from '../../../../shared/hooks/useModal'
import { type PermissionModel } from '../../../auth/types/model/permission'
import { type UserModel } from '../../../auth/types/model/user'
import { UserEmitter } from '../../events/UserEmitter'
import getAllPermissionsService from '../../services/getAllPermissionsService'
import getAllUsersService from '../../services/getAllUsersService'

export default function useUsersView(): UseUsersView {
  const { data: users, isLoading: usersIsLoading, mutate: mutateUsers } = getAllUsersService()
  const { data: permissions } = getAllPermissionsService()
  const openModal = useModal((state) => state.openModal)

  const handleAddUser = async (): Promise<void> => {
    const AddUser = (await import('../../components/Users/AddUser')).default
    openModal(<AddUser />)
  }

  const refetch = useCallback(async () => {
    await mutateUsers()
  }, [mutateUsers])

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
  }
}

export type UseUsersView = {
  users: UserModel[]
  isLoading: boolean
  handleAddUser: () => Promise<void>
  permissions: PermissionModel[]
}
