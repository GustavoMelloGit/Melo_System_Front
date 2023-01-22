import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react'
import { FormState, UseFormRegister } from 'react-hook-form'
import RHFField from '../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../shared/components/inputs/RHFMaskInput'
import { ClientFormValues } from './type'

type NaturalPersonFieldsProps = {
  formState: FormState<ClientFormValues>
  register: UseFormRegister<ClientFormValues>
  setValue: (name: keyof ClientFormValues, value: string) => void
}
export default function NaturalPersonFields({
  formState,
  register,
  setValue,
}: NaturalPersonFieldsProps): JSX.Element {
  return (
    <AccordionItem>
      <AccordionButton>
        <Text flex={1} textAlign='left'>
          Pessoa Física
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
          <GridItem>
            <RHFField<ClientFormValues>
              register={register}
              name='fatherName'
              label='Nome do pai'
              placeholder='Nome do pai do cliente'
              errors={formState.errors}
            />
          </GridItem>
          <GridItem>
            <RHFField<ClientFormValues>
              register={register}
              name='motherName'
              label='Nome da mãe'
              placeholder='Nome da mãe do cliente'
              errors={formState.errors}
            />
          </GridItem>
          <GridItem>
            <RHFField<ClientFormValues>
              register={register}
              name='birthDate'
              label='Data de nascimento'
              placeholder='Data de nascimento do cliente'
              type={'date'}
              errors={formState.errors}
            />
          </GridItem>
          <GridItem>
            <RHFMaskInput<ClientFormValues>
              register={register}
              name='cpf'
              label='CPF'
              placeholder='CPF do cliente'
              mask='000.000.000-00'
              errors={formState.errors}
              setValue={(value) => {
                setValue('cpf', value.match(/\d/g)?.join('') ?? '')
              }}
            />
          </GridItem>
          <GridItem>
            <RHFField<ClientFormValues>
              register={register}
              name='rg'
              label='RG'
              placeholder='RG do cliente'
              errors={formState.errors}
            />
          </GridItem>
          <GridItem>
            <RHFField<ClientFormValues>
              register={register}
              name='rgEmissionDate'
              label='Data de emissão do RG'
              placeholder='Data de emissão do RG do cliente'
              type='date'
              errors={formState.errors}
            />
          </GridItem>
          <GridItem>
            <RHFField<ClientFormValues>
              register={register}
              name='producerRegistration'
              label='Inscrição de produtor'
              placeholder='Inscrição de produtor do cliente'
              errors={formState.errors}
            />
          </GridItem>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  )
}
