import { Td, Tooltip, Tr } from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
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
      <Td textAlign='center'>
        <Tooltip
          shouldWrapChildren
          hasArrow
          label={`${transaction.userId}, ${new Date(transaction.createdAt).toLocaleDateString()}`}
        >
          <AiOutlineInfoCircle size={22} />
        </Tooltip>
      </Td>
    </Tr>
  )
}
