import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { CoffeeDetailsTypesEnum } from '../../../../../../../coffee/types/model/coffee'
import { getNumberOfBags } from '../../../../../../../coffee/utils/Coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  transaction: CoffeeTransactionModel
}
export default function CoffeeAccountTableRow({ transaction }: Props): JSX.Element {
  const { details } = transaction
  return (
    <Tr>
      <Td>{getNumberOfBags(transaction.type.value)}</Td>
      <Td>{CoffeeDetailsTypesEnum[details.type]}</Td>
      <Td textAlign='center'>{details.moisture}</Td>
      <Td textAlign='center'>{details.picking}</Td>
      <Td textAlign='center'>{details.sieve}</Td>
      <Td textAlign='center'>{details.drilled}</Td>
      <Td textAlign='center'>{details.foulness}</Td>
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
