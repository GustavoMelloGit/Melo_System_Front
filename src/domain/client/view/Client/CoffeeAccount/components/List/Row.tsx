import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../shared/components/MoreInfoTooltip'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'

type Props = {
  transaction: CoffeeTransactionModel
}
export default function CoffeeAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{transaction.clientBalance}</Td>
      <Td>{dateToFormat(transaction.createdAt)}</Td>
      <Td textAlign='center'>
        <MoreInfoTooltip
          label={`${transaction.user.name}, ${dateToFormat(
            transaction.createdAt,
            'dd/MM/yyyy kk:mm',
          )}`}
        />
      </Td>
    </Tr>
  )
}
