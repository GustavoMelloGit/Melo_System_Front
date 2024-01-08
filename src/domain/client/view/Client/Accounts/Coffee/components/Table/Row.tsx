import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/getColorByValue'
import { getNumberOfBags } from '../../../../../../../../lib/utils/getNumberOfBags'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import {
  CoffeeBebidasLabel,
  type CoffeeTypes,
} from '../../../../../../../coffee/types/model/coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getFullDescriptionFromCoffeeTransaction } from '../../utils/getFullDescriptionFromCoffeeTransaction'

type Props = {
  transaction: CoffeeTransactionModel
}
export default function CoffeeAccountTableRow({ transaction }: Props): JSX.Element {
  const labelByTypeName: Record<CoffeeTypes, string> = {
    bica_corrida: 'BC',
    conilon: 'CON',
    despolpado: 'DESP',
    escolha: 'ESC',
  }

  const fullDescription: string = getFullDescriptionFromCoffeeTransaction(transaction)
  const coffeeTypeColumnValue: string = transaction.details
    ? labelByTypeName[transaction.details.coffeeType]
    : '--'

  return (
    <Tr>
      <Td w={120}>{dateToFormat(transaction.date)}</Td>
      <Td title={coffeeTypeColumnValue}>{coffeeTypeColumnValue}</Td>
      <Td>{CoffeeBebidasLabel[transaction.type.name]}</Td>
      <Td>{fullDescription}</Td>
      <Td color={getColorByValue(transaction.type.value)} whiteSpace='nowrap'>
        {getNumberOfBags(transaction.type.value)}
      </Td>
      <Td color={getColorByValue(transaction.clientBalance)} whiteSpace='nowrap'>
        {getNumberOfBags(transaction.clientBalance)}
      </Td>
      <Td textAlign='center'>
        <MoreInfoTooltip
          label={`${transaction.user.name}, ${dateToFormat(
            transaction.createdAt,
            'dd/MM/yyyy kk:mm',
          )}`}
          placement='left'
        />
      </Td>
    </Tr>
  )
}
