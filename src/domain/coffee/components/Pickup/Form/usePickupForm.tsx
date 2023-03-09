import { useForm, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form'
import { useModal } from '../../../../../shared/hooks/useModal'
import { getClientsService } from '../../../../client/service'
import { type ClientModel } from '../../../../client/types/model/Client'
import { type PickupFormValues } from '../../../types/model/pickup'

type Props = {
  initialValues?: PickupFormValues
}
export default function usePickupForm({ initialValues }: Props): UsePickupForm {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<PickupFormValues>({
    defaultValues: initialValues,
  })
  const { data: clients, isLoading } = getClientsService(`name=${watch('clientName')}`)
  const closeModal = useModal((state) => state.closeModal)

  return {
    register,
    handleSubmit,
    clients,
    isLoading,
    closeModal,
    isSubmitting,
  }
}

type UsePickupForm = {
  register: UseFormRegister<PickupFormValues>
  handleSubmit: UseFormHandleSubmit<PickupFormValues>
  clients: ClientModel[] | undefined
  isLoading: boolean
  closeModal: () => void
  isSubmitting: boolean
}
