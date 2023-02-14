import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { removeEmptyProperties } from '../../../../lib/utils/utils'
import { createClientService } from '../../service'
import { type ClientFormValues } from '../../types/components/ClientsForm'
import { type UseCreateClientView } from '../../types/view/Create'

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
