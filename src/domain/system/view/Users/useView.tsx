import { useCallback, useEffect } from 'react'
import { useModal } from '../../../../shared/hooks/useModal'
import { type UserModel } from '../../../auth/types/model/user'
import { UserEmitter } from '../../events/UserEmitter'
import getAllUsersService from '../../services/getAllUsersService'

export default function useUsersView(): UseUsersView {
  const { data, isLoading, mutate } = getAllUsersService()
  const openModal = useModal((state) => state.openModal)

  const handleAddUser = async (): Promise<void> => {
    const AddUser = (await import('../../components/Users/AddUser')).default
    openModal(<AddUser />)
  }

  const refetch = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    UserEmitter.on('userCreated', refetch)
    return () => {
      UserEmitter.off('userCreated', refetch)
    }
  }, [refetch])

  return {
    users: data ?? [],
    isLoading,
    handleAddUser,
  }
}

export type UseUsersView = {
  users: UserModel[]
  isLoading: boolean
  handleAddUser: () => Promise<void>
}
