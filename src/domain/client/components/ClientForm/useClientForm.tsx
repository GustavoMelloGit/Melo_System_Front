import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../lib/errors'
import { ClientFormValues, UseClientForm } from './type'

const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.nameIsRequired),
  cpf: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.cpfIsRequired),
  }),
  birthDate: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.birthDateIsRequired),
  }),
  rg: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.rgIsRequired),
  }),
  fatherName: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.fatherNameIsRequired),
  }),
  motherName: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.motherNameIsRequired),
  }),
  rgEmissionDate: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.rgEmissionDateIsRequired),
  }),
  producerRegistration: yup.string().when('personType', {
    is: 'fisica',
    then: yup.string().required(validationErrors.producerRegistrationIsRequired),
  }),
  cnpj: yup.string().when('personType', {
    is: 'juridica',
    then: yup.string().required(validationErrors.cnpjIsRequired),
  }),
  stateRegistration: yup.string().when('personType', {
    is: 'juridica',
    then: yup.string().required(validationErrors.stateRegistrationIsRequired),
  }),
})

export default function useClientForm(): UseClientForm {
  const form = useForm<ClientFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      personType: 'fisica',
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
