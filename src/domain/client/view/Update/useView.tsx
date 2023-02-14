import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { removeEmptyProperties } from '../../../../lib/utils/utils'
import { getClientService, updateClientService } from '../../service'
import { type ClientFormValues } from '../../types/components/ClientsForm'
import { type UseUpdateClientView } from '../../types/view/Update'

export default function useUpdateClientView(): UseUpdateClientView {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, mutate } = getClientService(uuid ?? '')
  async function handleUpdateClient(values: ClientFormValues): Promise<void> {
    if (!uuid) {
      toast.error('Não foi possível atualizar o cliente')
      navigate(-1)
      return
    }
    const cleanValues = removeEmptyProperties(values) as ClientFormValues
    const { error } = await updateClientService(uuid, cleanValues)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Cliente atualizado com sucesso!')
    navigate(-1)
    await mutate?.()
  }
  return {
    handleUpdateClient,
    initialValues: data ?? emptyClient,
    isLoading,
  }
}

const emptyClient: ClientFormValues = {
  address: {
    brook: '',
    city: '',
    complement: '',
    neighborhood: '',
    number: '',
    state: '',
    street: '',
    zipCode: '',
  },
  contact: {
    phone: '',
  },
  profileImage: ' ',
  id: '',
  name: '',
  createdAt: '',
  updatedAt: '',
}
