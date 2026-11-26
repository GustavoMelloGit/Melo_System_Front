import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { type InterestCalculation } from '../../../lib/stores/InterestCalculatorStore'
import { formatCurrency } from '../../../lib/utils/formatters'
import { getColorByValue } from '../../../lib/utils/getColorByValue'
import { formatDateInput, formatInterestRate } from './utils'

type Props = {
  result: InterestCalculation
}
export default function InterestCalculatorResultTable({ result }: Props): JSX.Element {
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <TableContainer
      data-cy='interest-calculator-result'
      sx={{
        '& td': {
          borderBottom: '1px solid',
          borderColor,
        },
      }}
    >
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Data inicial</Th>
            <Th>Data final</Th>
            <Th>Dias corridos</Th>
            <Th>Taxa</Th>
            <Th>Valor</Th>
            <Th>Juros</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr fontWeight={600}>
            <Td>{formatDateInput(result.startDate)}</Td>
            <Td>{formatDateInput(result.endDate)}</Td>
            <Td>{result.days}</Td>
            <Td>{formatInterestRate(result.interestRate)}</Td>
            <Td color={getColorByValue(result.capitalInCents)}>
              {formatCurrency(result.capitalInCents)}
            </Td>
            <Td color={getColorByValue(result.interest)}>{formatCurrency(result.interest)}</Td>
            <Td color={getColorByValue(result.total)}>{formatCurrency(result.total)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
