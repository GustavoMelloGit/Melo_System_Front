import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import { shallow } from 'zustand/shallow'
import {
  type InterestCalculation,
  useInterestCalculatorStore,
} from '../../../lib/stores/InterestCalculatorStore'
import { dateToFormat, formatCurrency } from '../../../lib/utils/formatters'
import { getColorByValue } from '../../../lib/utils/getColorByValue'
import { formatDateInput, formatInterestRate } from './utils'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect: (calculation: InterestCalculation) => void
}
export default function InterestCalculatorHistoryDrawer({
  isOpen,
  onClose,
  onSelect,
}: Props): JSX.Element {
  const [history, removeFromHistory, clearHistory] = useInterestCalculatorStore(
    (state) => [state.history, state.removeFromHistory, state.clearHistory],
    shallow,
  )
  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const cardHoverBg = useColorModeValue('gray.100', 'gray.600')

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement='right' size='sm'>
      <DrawerOverlay />
      <DrawerContent data-cy='interest-calculator-history'>
        <DrawerCloseButton />
        <DrawerHeader>Histórico de cálculos</DrawerHeader>
        <DrawerBody>
          {history.length ? (
            <Stack spacing={3}>
              {history.map((item) => (
                <Box
                  key={item.id}
                  as='button'
                  type='button'
                  textAlign='left'
                  bg={cardBg}
                  _hover={{ bg: cardHoverBg }}
                  transition='background .2s'
                  rounded='xl'
                  p={3}
                  onClick={() => {
                    onSelect(item)
                  }}
                  title='Carregar este cálculo'
                >
                  <Flex justify='space-between' align='center' gap={2} mb={2}>
                    <Text fontSize='xs' color='gray.500'>
                      Calculado em {dateToFormat(item.createdAt, 'dd/MM/yyyy HH:mm')}
                    </Text>
                    <Tooltip label='Remover do histórico' hasArrow>
                      <IconButton
                        as='span'
                        size='xs'
                        variant='ghost'
                        aria-label='Remover do histórico'
                        icon={<BiTrash />}
                        onClick={(event) => {
                          event.stopPropagation()
                          removeFromHistory(item.id)
                        }}
                      />
                    </Tooltip>
                  </Flex>
                  <SimpleGrid columns={2} spacingX={4} spacingY={1} fontSize='sm'>
                    <Text>
                      <b>Período:</b> {formatDateInput(item.startDate)} a{' '}
                      {formatDateInput(item.endDate)}
                    </Text>
                    <Text>
                      <b>Dias:</b> {item.days}
                    </Text>
                    <Text>
                      <b>Valor:</b> {formatCurrency(item.capitalInCents)}
                    </Text>
                    <Text>
                      <b>Taxa:</b> {formatInterestRate(item.interestRate)}
                    </Text>
                    <Text>
                      <b>Juros:</b>{' '}
                      <Text as='span' color={getColorByValue(item.interest)}>
                        {formatCurrency(item.interest)}
                      </Text>
                    </Text>
                    <Text>
                      <b>Total:</b>{' '}
                      <Text as='span' color={getColorByValue(item.total)}>
                        {formatCurrency(item.total)}
                      </Text>
                    </Text>
                  </SimpleGrid>
                </Box>
              ))}
            </Stack>
          ) : (
            <Text textAlign='center' color='gray.500' mt={8}>
              Nenhum cálculo no histórico
            </Text>
          )}
        </DrawerBody>
        {history.length > 0 && (
          <DrawerFooter>
            <Button w='full' variant='outline' colorScheme='red' onClick={clearHistory}>
              Limpar histórico
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
