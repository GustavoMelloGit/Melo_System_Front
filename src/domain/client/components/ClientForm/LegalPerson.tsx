import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
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
    <AccordionItem>
      <AccordionButton>
        <Text flex={1} textAlign='left'>
          Pessoa Jurídica
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <RHFMaskInput<ClientFormValues>
          register={register}
          name='cnpj'
          label='CNPJ'
          placeholder='CNPJ do cliente'
          mask='00.000.000/0000-00'
          errors={formState.errors}
        />
        <RHFField<ClientFormValues>
          register={register}
          name='stateRegistration'
          label='Inscrição estadual'
          placeholder='Inscrição estadual do cliente'
          errors={formState.errors}
        />
      </AccordionPanel>
    </AccordionItem>
  )
}
