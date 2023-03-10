import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { useModal } from '../../../../../shared/hooks/useModal'
import { getClientsService } from '../../../../client/service'
import { type ClientModel } from '../../../../client/types/model/Client'
import { type PickupFormValues } from '../../../types/model/pickup'

type Props = {
  initialValues?: PickupFormValues
}
export default function usePickupForm({ initialValues }: Props): UsePickupForm {
  const form = useForm<PickupFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const { data: clients, isLoading } = getClientsService(`name=${form.watch('clientName')}`)
  const closeModal = useModal((state) => state.closeModal)

  return {
    clients,
    isLoading,
    closeModal,
    form,
  }
}

const validationSchema = yup.object().shape({
  clientName: yup.string().required(validationErrors.clientNameIsRequired),
  bags: yup.string().required(validationErrors.bagsIsRequired),
  address: yup.string().required(validationErrors.addressIsRequired),
})

type UsePickupForm = {
  clients: ClientModel[] | undefined
  isLoading: boolean
  closeModal: () => void
  form: UseFormReturn<PickupFormValues, any>
}
