import { useParams } from 'react-router-dom'
import { getClientService } from '../../service'
import { type ClientFormValues } from '../../types/components/ClientsForm'
import { type UseUpdateClientView } from '../../types/view/Update'

export default function useUpdateClientView(): UseUpdateClientView {
  const { uuid } = useParams()

  const { data, isLoading } = getClientService(uuid ?? '')
  async function handleUpdateClient(values: ClientFormValues): Promise<void> {
    console.log(values)
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
    fatherName: '',
    motherName: '',
    phone: '',
  },
  profileImage: ' ',
  id: '',
  name: '',
}
