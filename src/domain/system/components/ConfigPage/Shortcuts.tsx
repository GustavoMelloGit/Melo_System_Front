import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
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
          <Stack>
            <ShortcutItem label='Pesquisar cliente' shortcut='ctrl + space' />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

type ShortcutItemProps = {
  label: string
  shortcut: string
}
function ShortcutItem({ shortcut, label }: ShortcutItemProps): JSX.Element {
  return (
    <Flex justify={'space-between'} align='center'>
      <Text>{label}</Text>
      <Box
        as='code'
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
        {shortcut}
      </Box>
    </Flex>
  )
}
