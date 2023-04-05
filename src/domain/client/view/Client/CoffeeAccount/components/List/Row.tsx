import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../shared/components/MoreInfoTooltip'
import { CoffeeDetailsTypesEnum } from '../../../../../../coffee/types/model/coffee'
import { getNumberOfBags } from '../../../../../../coffee/utils/Coffee'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'
import { useKgPerBag } from '../../stores/useKgPerBag'

type Props = {
  transaction: CoffeeTransactionModel
}
export default function CoffeeAccountTableRow({ transaction }: Props): JSX.Element {
  const kgPerBag = useKgPerBag((state) => state.kgPerBag)
  return (
    <Tr>
      <Td>{getNumberOfBags(transaction.type.value, kgPerBag)}</Td>
      <Td>{CoffeeDetailsTypesEnum[transaction.details.type]}</Td>
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
