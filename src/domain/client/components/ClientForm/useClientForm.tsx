import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../lib/errors'
import { ClientFormValues, UseClientForm } from '../../types/components/ClientsForm'

const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.nameIsRequired),
})

type UseClientFormProps = {
  defaultValues: ClientFormValues
}
export default function useClientForm({ defaultValues }: UseClientFormProps): UseClientForm {
  const form = useForm<ClientFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  return {
    form,
  }
}
