import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { removeEmptyProperties } from '../../../../../lib/utils/utils'
import { type ClientFormValues } from '../../../components/ClientForm/useClientForm'
import { createClientService } from '../../../service'

export default function useCreateClientView(): UseCreateClientView {
  const navigate = useNavigate()

  async function handleCreateClient(values: ClientFormValues): Promise<void> {
    const cleanValues = removeEmptyProperties(values) as ClientFormValues
    const { error } = await createClientService(cleanValues)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Cliente criado com sucesso!')
    navigate(-1)
  }

  return {
    handleCreateClient,
  }
}

export type UseCreateClientView = {
  handleCreateClient: (values: ClientFormValues) => Promise<void>
}
