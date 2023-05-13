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
      <Td>{dateToFormat(transaction.date)}</Td>
      <Td>{getNumberOfBags(transaction.type.value)}</Td>
      <Td>{transaction?.details?.utilization ?? 0}</Td>
      <Td>{transaction?.details?.foulness ?? 0}</Td>
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
