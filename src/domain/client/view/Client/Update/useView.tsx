import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { removeEmptyProperties } from '../../../../../lib/utils/utils'
import { type ClientFormValues } from '../../../components/Client/Form/types'
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
  let initialValues: ClientFormValues = emptyClient

  if (data && data.personType.type === 'fisica') {
    initialValues = {
      ...data,
      personType: {
        ...data.personType,
        ...(data.personType.birthDate && {
          birthDate: new Date(data.personType.birthDate).toISOString().split('T')[0],
        }),
        ...(data.personType.rgEmissionDate && {
          rgEmissionDate: new Date(data.personType.rgEmissionDate).toISOString().split('T')[0],
        }),
      },
    } as ClientFormValues
  } else if (data && data.personType.type === 'juridica') {
    initialValues = data as ClientFormValues
  }

  return {
    handleUpdateClient,
    initialValues,
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
    location: {
      lat: 0,
      lng: 0,
    },
  },
  balance: 0,
  description: '',
  nickname: '',
  contact: {
    phone: '',
  },
  personType: {
    type: 'fisica',
    birthDate: '',
    cpf: '',
    rg: '',
    fatherName: '',
    motherName: '',
    producerRegistration: '',
    rgEmissionDate: '',
  },
  profileImage: ' ',
  name: '',
}
