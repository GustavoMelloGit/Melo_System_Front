import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../lib/errors'
import { ClientFormValues, UseClientForm } from './type'

const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.nameIsRequired),
})

export default function useClientForm(): UseClientForm {
  const form = useForm<ClientFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      personType: {
        personType: 'fisica',
      },
    },
  })

  async function handleSubmit(values: ClientFormValues): Promise<void> {
    console.log(values)
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  }
}
