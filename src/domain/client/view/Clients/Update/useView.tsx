import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { removeEmptyProperties } from '../../../../../lib/utils/utils'
import { type ClientFormValues } from '../../../components/Client/Form/useClientForm'
import { getClientService, updateClientService } from '../../../service'

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
    initialValues: data?.data ?? emptyClient,
    isLoading,
  }
}

export type UseUpdateClientView = {
  handleUpdateClient: (client: ClientFormValues) => Promise<void>
  initialValues: ClientFormValues
  isLoading: boolean
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
  balance: 0,
  contact: {
    phone: '',
  },
  profileImage: ' ',
  id: '',
  name: '',
  createdAt: 0,
  updatedAt: 0,
}
