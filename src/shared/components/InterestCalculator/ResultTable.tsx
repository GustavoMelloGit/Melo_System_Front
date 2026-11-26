import {
  Divider,
  Flex,
  Stack,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  type TableContainerProps,
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
  const containerProps: TableContainerProps = {
    sx: {
      '& td': {
        borderBottom: '1px solid',
        borderColor,
      },
    },
  }

  const mobileRows: Array<{ label: string; value: string; color?: string }> = [
    { label: 'Data inicial', value: formatDateInput(result.startDate) },
    { label: 'Data final', value: formatDateInput(result.endDate) },
    { label: 'Dias', value: String(result.days) },
    { label: 'Taxa', value: formatInterestRate(result.interestRate) },
    {
      label: 'Valor',
      value: formatCurrency(result.capitalInCents),
      color: getColorByValue(result.capitalInCents),
    },
    {
      label: 'Juros',
      value: formatCurrency(result.interest),
      color: getColorByValue(result.interest),
    },
    { label: 'Total', value: formatCurrency(result.total), color: getColorByValue(result.total) },
  ]

  return (
    <>
      <Stack
        spacing={2}
        display={{ base: 'flex', md: 'none' }}
        data-cy='interest-calculator-result-mobile'
      >
        {mobileRows.map((row, index) => (
          <Stack key={row.label} spacing={2}>
            {index > 0 && <Divider />}
            <Flex justify='space-between' align='center' gap={3} wrap='wrap'>
              <Text fontSize='xs' fontWeight={700} textTransform='uppercase' color='gray.500'>
                {row.label}
              </Text>
              <Text fontWeight={row.label === 'Total' ? 700 : 600} color={row.color}>
                {row.value}
              </Text>
            </Flex>
          </Stack>
        ))}
      </Stack>
      <Stack
        spacing={3}
        display={{ base: 'none', md: 'flex' }}
        data-cy='interest-calculator-result'
      >
        <TableContainer {...containerProps}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Data inicial</Th>
                <Th>Data final</Th>
                <Th>Dias</Th>
                <Th>Taxa</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr fontWeight={600}>
                <Td>{formatDateInput(result.startDate)}</Td>
                <Td>{formatDateInput(result.endDate)}</Td>
                <Td>{result.days}</Td>
                <Td>{formatInterestRate(result.interestRate)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer {...containerProps}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Valor</Th>
                <Th>Juros</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr fontWeight={600}>
                <Td color={getColorByValue(result.capitalInCents)}>
                  {formatCurrency(result.capitalInCents)}
                </Td>
                <Td color={getColorByValue(result.interest)}>{formatCurrency(result.interest)}</Td>
                <Td color={getColorByValue(result.total)} fontSize='md' fontWeight={700}>
                  {formatCurrency(result.total)}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  )
}
