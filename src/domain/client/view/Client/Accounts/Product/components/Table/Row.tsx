import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import CollapsibleTd from '../../../../../../../../shared/components/table/CollapsibleTd'
import { type FertilizerTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: FertilizerTransactionModel
}
export default function FertilizerAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{dateToFormat(transaction.date)}</Td>
      <CollapsibleTd>{transaction.description}</CollapsibleTd>
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
