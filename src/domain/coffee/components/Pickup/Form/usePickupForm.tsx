import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
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
  const closeModal = useModal((state) => state.closeModal)
  const form = useForm<PickupFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const clientName = form.watch('clientName')
  const { data: clients, isLoading } = getClientsService(`name=${clientName}`)

  useEffect(() => {
    if (!clients) return
    if (clients.length === 1) {
      const [client] = clients
      const { address } = client
      const valueOrUndefined = (value?: string): string => value ?? ''
      const addressString = `${valueOrUndefined(address?.brook)} ${valueOrUndefined(
        address?.street,
      )} ${valueOrUndefined(address?.number)} ${valueOrUndefined(address?.complement)}`
      form.setValue('address', addressString)
    }
  }, [clients])

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
