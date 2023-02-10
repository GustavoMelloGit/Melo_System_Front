import { Td, Tr } from '@chakra-ui/react'
import { formatCurrency } from '../../../../../../../../lib/utils/utils'
import TableEditButton from '../../../../../../../../shared/components/table/Buttons/Edit'
import { type TransactionModel } from '../../../../../../types/model/Transaction'

type TransactionsListRowProps = {
  transaction: TransactionModel
}
export default function TransactionsListRow({
  transaction,
}: TransactionsListRowProps): JSX.Element {
  return (
    <Tr>
      <Td>{transaction.description}</Td>
      <Td>{formatCurrency(transaction.value)}</Td>
      <Td>
        <TableEditButton
          aria-label='Editar transação'
          onClick={() => {
            console.log('Edit transaction')
          }}
        />
      </Td>
    </Tr>
  )
}
