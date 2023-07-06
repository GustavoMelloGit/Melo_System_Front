import { HStack, Td, Tr, useColorModeValue, type TableCellProps } from '@chakra-ui/react'
import { useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import {
  currencyValueCorrection,
  dateToFormat,
  formatCurrency,
} from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import CollapsibleTd from '../../../../../../../../shared/components/table/CollapsibleTd'
import { type CurrencyTransactionModel } from '../../../../../../types/model/Transaction'
import { useFeeStore, type TransactionSelected } from '../../stores/useFeeStore'
import { type OnSelectFee } from './useView'

type TransactionsListRowProps = {
  transaction: CurrencyTransactionModel
  onSelectFee: OnSelectFee
}
export default function TransactionsListRow({
  transaction,
  onSelectFee,
}: TransactionsListRowProps): JSX.Element {
  const activeColor = useColorModeValue('blue.500', 'blue.200')
  const [selectionMode, selectedTransactions] = useFeeStore(
    (state) => [state.selectionMode, state.selectedTransactions],
    shallow,
  )
  const transactionSelected = useMemo(
    () => selectedTransactions.find((fee) => fee.id === transaction.id),
    [transaction.id, selectedTransactions],
  )
  const valueSelected = transactionSelected?.amount
  const clientBalance = currencyValueCorrection(transaction.clientBalance)

  const handleSelectFee = (amount: number): void => {
    if (!selectionMode) return
    const selectionFee: TransactionSelected = {
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
      <Td>{dateToFormat(transaction.date, 'dd/MM/yyyy')}</Td>
      <CollapsibleTd>{transaction.description}</CollapsibleTd>
      <Td {...selectableColumnsProps(transaction.type.value)} textAlign='center'>
        {formatCurrency(transaction.type.value)}
      </Td>
      <Td {...selectableColumnsProps(clientBalance)} textAlign='center'>
        {formatCurrency(clientBalance)}
      </Td>
      <Td>
        <HStack w='full' justify='center'>
          <MoreInfoTooltip
            label={`${transaction.user.name}, ${dateToFormat(
              transaction.createdAt,
              'dd/MM/yyyy kk:mm',
            )}`}
          />
        </HStack>
      </Td>
    </Tr>
  )
}
