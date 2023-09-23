import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'

export default function SystemShortcuts(): JSX.Element {
  return (
    <Accordion allowToggle>
      <AccordionItem border='none'>
        <AccordionButton p={0}>
          <Text fontWeight={700} fontSize='lg' flex={1} textAlign='left'>
            Atalhos do teclado
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex justify={'space-between'} align='center'>
            <Text>Pesquisar cliente</Text>
            <Button
              variant='unstyled'
              minH='unset'
              h='unset'
              borderWidth={1}
              borderStyle='solid'
              borderColor='GrayText'
              rounded={6}
              fontWeight='medium'
              py={1}
              px={2}
            >
              <code>ctrl + space</code>
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
