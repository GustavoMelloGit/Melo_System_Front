import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { ClientNameParser } from '../../../../../lib/utils/ClientNameParser'
import { normalize } from '../../../../../lib/utils/normalize'
import useDebounce from '../../../../../shared/hooks/useDebounce'
import { useModal } from '../../../../../shared/hooks/useModal'
import { useGetClientsService } from '../../../../client/service/ClientService.hooks'
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
  const debouncedClientName = useDebounce(clientName, 300)
  const searchableName = normalize(ClientNameParser.removeNickname(debouncedClientName))
  const clientNickname = ClientNameParser.getNickname(debouncedClientName)

  const { data, isLoading } = useGetClientsService(
    `searchableName=${searchableName}${
      clientNickname ? `&nickname=${clientNickname ?? ''}` : ''
    }&limit=10`,
  )

  useEffect(() => {
    const isUpdate = Boolean(initialValues?.complement && initialValues?.brook)
    if (isUpdate) return

    if (!data) return
    if (data.data.length === 1) {
      const [client] = data.data
      const { address } = client
      form.setValue('brook', address.brook ?? '')
      form.setValue('complement', address.complement ?? '')
    }
  }, [data, form, initialValues?.brook, initialValues?.complement])

  return {
    clients: data?.data,
    isLoading,
    closeModal,
    form,
  }
}

const validationSchema = yup.object().shape({
  clientId: yup.string().required(validationErrors.clientNameIsRequired),
  bags: yup.string().required(validationErrors.bagsIsRequired),
  brook: yup.string().required(validationErrors.brookIsRequired),
  complement: yup.string().required(validationErrors.complementIsRequired),
})

type UsePickupForm = {
  clients: ClientModel[] | undefined
  isLoading: boolean
  closeModal: () => void
  form: UseFormReturn<PickupFormValues, any>
}
