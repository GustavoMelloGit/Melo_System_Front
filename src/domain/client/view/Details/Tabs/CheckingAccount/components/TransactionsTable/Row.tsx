import { Td, Tr } from '@chakra-ui/react'
import { formatCurrency } from '../../../../../../../../lib/utils/utils'
import { type TransactionModel } from '../../../../../../types/model/Transaction'

type TransactionsListRowProps = {
  transaction: TransactionModel
}
export default function TransactionsListRow({
  transaction,
}: TransactionsListRowProps): JSX.Element {
  return (
    <Tr>
      <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
      <Td>{transaction.description}</Td>
      <Td>{formatCurrency(transaction.value)}</Td>
    </Tr>
  )
}
