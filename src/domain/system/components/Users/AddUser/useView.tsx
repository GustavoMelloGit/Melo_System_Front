import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { UserEmitter } from '../../../events/UserEmitter'
import { createUserService } from '../../../services/createUserService'
import { type AddUserFormValues } from './types'

export default function useAddUser(): UseAddUser {
  const closeModal = useModal((state) => state.closeModal)

  const handleAddUser = async (values: AddUserFormValues): Promise<void> => {
    const { error } = await createUserService(values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Usuário criado com sucesso')
    UserEmitter.emit('userCreated', values)
    closeModal()
  }

  return { handleAddUser }
}

type UseAddUser = {
  handleAddUser: (values: AddUserFormValues) => Promise<void>
}
