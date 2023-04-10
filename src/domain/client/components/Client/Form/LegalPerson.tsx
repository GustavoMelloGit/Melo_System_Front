import { Grid, GridItem } from '@chakra-ui/react'
import { type FormState, type UseFormRegister } from 'react-hook-form'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../../shared/components/inputs/RHFMaskInput'
import { type ClientFormValues } from './useClientForm'

type LegalPersonFieldsProps = {
  formState: FormState<ClientFormValues>
  register: UseFormRegister<ClientFormValues>
}
export default function LegalPersonFields({
  formState,
  register,
}: LegalPersonFieldsProps): JSX.Element {
  return (
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
      <GridItem>
        <RHFMaskInput<ClientFormValues>
          register={register}
          name='personType.cnpj'
          label='CNPJ'
          placeholder='CNPJ do cliente'
          mask='00.000.000/0000-00'
          errors={formState.errors}
          data-cy='client-cnpj-input'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.stateRegistration'
          label='Inscrição estadual'
          placeholder='Inscrição estadual do cliente'
          errors={formState.errors}
          data-cy='client-state-registration-input'
        />
      </GridItem>
    </Grid>
  )
}
