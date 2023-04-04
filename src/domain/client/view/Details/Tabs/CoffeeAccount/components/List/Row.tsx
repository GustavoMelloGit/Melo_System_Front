import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { type TransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: TransactionModel
}
export default function CoffeeAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{dateToFormat(transaction.createdAt)}</Td>
    </Tr>
  )
}
