import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { type SacariaTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: SacariaTransactionModel
}
export default function SacariaAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{transaction.clientBalance}</Td>
      <Td>{transaction.type.value}</Td>
      <Td>{transaction.description}</Td>
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
