import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useFormContext, useWatch } from 'react-hook-form'
import AddressFields from './Address'
import LegalPersonFields from './LegalPerson'
import NaturalPersonFields from './NaturalPerson'
import { ClientFormValues } from './types'

export default function PersonData(): JSX.Element {
  const { control, formState } = useFormContext<ClientFormValues>()
  const isLegalPerson = useWatch({ control, name: 'personType.type' }) === 'juridica'
  const formHasErrors = Object.keys(formState.errors).length > 0

  return (
    <VStack align='stretch'>
      <Accordion allowToggle index={formHasErrors ? 0 : undefined}>
        <AccordionItem border='none'>
          <AccordionButton data-cy='address-accordion' pl={0}>
            <AccordionIcon />
            <Text flex={1} fontWeight={700} textAlign='left'>
              Endereço
            </Text>
          </AccordionButton>
          <AccordionPanel>
            <AddressFields />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Accordion allowToggle index={formHasErrors ? 0 : undefined}>
        <AccordionItem border='none'>
          <AccordionButton pl={0} data-cy='client-personType-accordion'>
            <AccordionIcon />
            <Text flex={1} fontWeight={700} textAlign='left'>
              {isLegalPerson ? 'Dados da empresa' : 'Dados pessoais'}
            </Text>
          </AccordionButton>
          <AccordionPanel>
            {isLegalPerson ? <LegalPersonFields /> : <NaturalPersonFields />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  )
}
