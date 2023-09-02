import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/getColorByValue'
import { getNumberOfBags } from '../../../../../../../../lib/utils/getNumberOfBags'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import CollapsibleTd from '../../../../../../../../shared/components/table/CollapsibleTd'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: EscolhaTransactionModel
}
export default function EscolhaAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{dateToFormat(transaction.date)}</Td>
      <CollapsibleTd>{transaction.description}</CollapsibleTd>
      <Td>{transaction?.details?.utilization ?? 0}</Td>
      <Td>{transaction?.details?.foulness ?? 0}</Td>
      <Td color={getColorByValue(transaction.type.value)}>
        {getNumberOfBags(transaction.type.value)}
      </Td>
      <Td color={getColorByValue(transaction.clientBalance)}>
        {getNumberOfBags(transaction.clientBalance)}
      </Td>
      <Td textAlign='center'>
        <MoreInfoTooltip
          placement='left'
          label={`${transaction.user.name}, ${dateToFormat(
            transaction.createdAt,
            'dd/MM/yyyy kk:mm',
          )}`}
        />
      </Td>
    </Tr>
  )
}
