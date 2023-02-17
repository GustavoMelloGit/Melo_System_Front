import { HStack, Td, Tr, useColorModeValue, type TableCellProps } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'
import { formatCurrency, formatDate } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { type TransactionModel } from '../../../../../../types/model/Transaction'
import { useFeeStore, type FeeSelection } from '../../stores/useFeeStore'
import { type OnSelectFee } from './useView'

type TransactionsListRowProps = {
  transaction: TransactionModel
  onSelectFee: OnSelectFee
}
export default function TransactionsListRow({
  transaction,
  onSelectFee,
}: TransactionsListRowProps): JSX.Element {
  const activeColor = useColorModeValue('blue.500', 'blue.200')
  const [selectionMode, selectedFees] = useFeeStore(
    (state) => [state.selectionMode, state.selectedFees],
    shallow,
  )
  const transactionSelected = selectedFees.find((fee) => fee.id === transaction.id)
  const valueSelected = transactionSelected?.amount

  const handleSelectFee = (amount: number): void => {
    if (!selectionMode) return
    const selectionFee: FeeSelection = {
      id: transaction.id,
      amount,
      date: transaction.date,
    }
    onSelectFee(selectionFee)
  }

  const selectableColumnsProps = (value: number): TableCellProps => ({
    cursor: selectionMode ? 'pointer' : 'default',
    outline: valueSelected === value ? `1px solid ` : undefined,
    outlineColor: valueSelected === value ? activeColor : undefined,
    onClick: () => {
      handleSelectFee(value)
    },
    color: getColorByValue(value),
  })

  return (
    <Tr>
      <Td>{formatDate(transaction.date)}</Td>
      <Td
        title={transaction.description}
        maxW={80}
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
      >
        {transaction.description}
      </Td>
      <Td {...selectableColumnsProps(transaction.value)}>{formatCurrency(transaction.value)}</Td>
      <Td {...selectableColumnsProps(transaction.clientBalance)}>
        {formatCurrency(transaction.clientBalance)}
      </Td>
      <Td>
        <HStack w='full' justify='center'>
          <MoreInfoTooltip
            label={`${transaction.user.name}, ${formatDate(transaction.createdAt)}`}
          />
        </HStack>
      </Td>
    </Tr>
  )
}
