import { HStack, Td, Tr } from '@chakra-ui/react'
import { formatCurrency, formatDate } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import TableEditButton from '../../../../../../../../shared/components/table/buttons/Edit'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { type TransactionModel } from '../../../../../../types/model/Transaction'
import UpdateTransactionView from '../../Update'

type TransactionsListRowProps = {
  transaction: TransactionModel
}
export default function TransactionsListRow({
  transaction,
}: TransactionsListRowProps): JSX.Element {
  const openModal = useModal((state) => state.openModal)
  const handleUpdate = (): void => {
    openModal(<UpdateTransactionView transaction={transaction} />)
  }
  return (
    <Tr>
      <Td>{formatDate(transaction.date, 'dd/MM/yyyy')}</Td>
      <Td
        title={transaction.description}
        maxW={80}
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
      >
        {transaction.description}
      </Td>
      <Td>{formatCurrency(transaction.value)}</Td>
      <Td>
        <HStack w='full' justify='center'>
          <MoreInfoTooltip
            label={`${transaction.userId}, ${new Date(transaction.createdAt).toLocaleDateString()}`}
          />
          <TableEditButton aria-label='Editar transação' onClick={handleUpdate} />
        </HStack>
      </Td>
    </Tr>
  )
}
