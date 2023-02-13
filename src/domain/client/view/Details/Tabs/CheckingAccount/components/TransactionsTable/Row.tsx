import { Td, Tr } from '@chakra-ui/react'
import { formatCurrency } from '../../../../../../../../lib/utils/utils'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
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
      <Td textAlign='center'>
        <MoreInfoTooltip
          label={`${transaction.userId}, ${new Date(transaction.createdAt).toLocaleDateString()}`}
        />
      </Td>
    </Tr>
  )
}
