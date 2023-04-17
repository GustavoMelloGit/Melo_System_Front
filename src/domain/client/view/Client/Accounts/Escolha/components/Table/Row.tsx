import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { getNumberOfBags } from '../../../../../../../coffee/utils/Coffee'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: EscolhaTransactionModel
}
export default function EscolhaAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{getNumberOfBags(transaction.type.value)}</Td>
      <Td>{transaction.details.utilization}</Td>
      <Td>{dateToFormat(transaction.createdAt)}</Td>
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
