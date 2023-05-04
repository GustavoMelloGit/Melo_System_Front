import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { type SacariaTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: SacariaTransactionModel
}
export default function SacariaAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{dateToFormat(transaction.date)}</Td>
      <Td>{transaction.description}</Td>
      <Td color={getColorByValue(transaction.type.value)} textAlign='center'>
        {transaction.type.value > 0 ? `+${transaction.type.value}` : transaction.type.value}
      </Td>
      <Td color={getColorByValue(transaction.clientBalance)} textAlign='center'>
        {transaction.clientBalance}
      </Td>
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
