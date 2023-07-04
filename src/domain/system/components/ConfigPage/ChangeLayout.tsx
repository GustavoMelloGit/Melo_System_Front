import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Select,
  Stack,
  Text,
  type SpaceProps,
} from '@chakra-ui/react'
import { type LayoutSizes } from '../../../../shared/contexts/LayoutContext/types'
import useLayoutContext from '../../../../shared/hooks/useLayoutContext'

export default function ChangeLayout(): JSX.Element {
  const {
    layout: { setSize, size },
  } = useLayoutContext()

  function handleSetSize(size: LayoutSizes): void {
    setSize(size)
  }

  const layoutOptions: Record<LayoutSizes, string> = {
    md: 'Pequeno',
    lg: 'Médio',
    xl: 'Grande',
  }
  const widthByLayout: Record<LayoutSizes, SpaceProps['mx']> = {
    md: {
      base: 16,
      sm: 32,
    },
    lg: {
      base: 14,
      sm: 24,
    },
    xl: {
      base: 8,
      sm: 16,
    },
  }

  return (
    <Stack spacing={3}>
      <Flex flexWrap='wrap' gap={2} w='full' justify='space-between' align='center'>
        <Text fontWeight={700} fontSize='lg'>
          Layout
        </Text>
        <Select
          w={40}
          onChange={(e) => {
            handleSetSize(e.target.value as LayoutSizes)
          }}
          defaultValue={size}
        >
          {Object.entries(layoutOptions).map(([size, label]) => (
            <option key={size} value={size}>
              {label}
            </option>
          ))}
        </Select>
      </Flex>
      <Accordion allowToggle>
        <AccordionItem borderTop='none'>
          <AccordionButton>
            <Text>Visualizar</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Flex
              w='full'
              h={40}
              rounded={10}
              overflow='hidden'
              borderWidth={1}
              borderColor='gray.600'
            >
              <Box bg='gray.500' h='full' w={14} />
              <Box flex={1} py={2}>
                <Box
                  bg='blue.500'
                  h='full'
                  rounded={8}
                  mx={widthByLayout[size]}
                  transition='margin 0.2s'
                />
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}
