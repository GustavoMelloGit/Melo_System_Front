import { Grid, GridItem } from '@chakra-ui/react'
import { type FormState, type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import RHFField from '../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../shared/components/inputs/RHFMaskInput'
import { type ClientFormValues } from '../../types/components/ClientsForm'

type NaturalPersonFieldsProps = {
  formState: FormState<ClientFormValues>
  register: UseFormRegister<ClientFormValues>
  setValue: UseFormSetValue<ClientFormValues>
}
export default function NaturalPersonFields({
  formState,
  register,
  setValue,
}: NaturalPersonFieldsProps): JSX.Element {
  return (
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.fatherName'
          label='Nome do pai'
          placeholder='Nome do pai do cliente'
          errors={formState.errors}
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.motherName'
          label='Nome da mãe'
          placeholder='Nome da mãe do cliente'
          errors={formState.errors}
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.birthDate'
          label='Data de nascimento'
          placeholder='Data de nascimento do cliente'
          type={'date'}
          errors={formState.errors}
        />
      </GridItem>
      <GridItem>
        <RHFMaskInput<ClientFormValues>
          register={register}
          name='personType.cpf'
          label='CPF'
          placeholder='CPF do cliente'
          mask='000.000.000-00'
          errors={formState.errors}
          setValue={(value) => {
            setValue('personType.cpf', value.match(/\d/g)?.join('') ?? '')
          }}
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.rg'
          label='RG'
          placeholder='RG do cliente'
          errors={formState.errors}
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.rgEmissionDate'
          label='Data de emissão do RG'
          placeholder='Data de emissão do RG do cliente'
          type='date'
          errors={formState.errors}
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='personType.producerRegistration'
          label='Inscrição de produtor'
          placeholder='Inscrição de produtor do cliente'
          errors={formState.errors}
        />
      </GridItem>
    </Grid>
  )
}
