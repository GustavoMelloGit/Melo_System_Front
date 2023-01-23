import { Grid, GridItem } from '@chakra-ui/react'
import { FormState, UseFormRegister } from 'react-hook-form'
import RHFField from '../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../shared/components/inputs/RHFMaskInput'
import { ClientFormValues } from './type'

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
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.stateRegistration'
          label='Inscrição estadual'
          placeholder='Inscrição estadual do cliente'
          errors={formState.errors}
        />
      </GridItem>
    </Grid>
  )
}
