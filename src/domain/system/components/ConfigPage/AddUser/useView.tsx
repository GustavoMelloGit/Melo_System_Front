import { toast } from 'react-hot-toast'
import { createUserService } from '../../../services/createUserService'
import { type AddUserFormValues } from './types'

export default function useAddUser(): UseAddUser {
  const handleAddUser = async (values: AddUserFormValues): Promise<void> => {
    const { error } = await createUserService(values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Usuário criado com sucesso')
  }

  return { handleAddUser }
}

type UseAddUser = {
  handleAddUser: (values: AddUserFormValues) => Promise<void>
}
