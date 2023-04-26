import { Td, Tr } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import {
  CoffeeDetailsTypesEnum,
  type CoffeeDetails,
  type CoffeeTypes,
} from '../../../../../../../coffee/types/model/coffee'
import { getNumberOfBags } from '../../../../../../../coffee/utils/Coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
const padding = 3

type Props = {
  transaction: CoffeeTransactionModel
}
export default function CoffeeAccountTableRow({ transaction }: Props): JSX.Element {
  const { details } = transaction
  const messageByDetail: Record<keyof CoffeeDetails, string> = {
    moisture: `${details.moisture} de umidade`,
    picking: `${details.picking} de cata`,
    sieve: `${details.sieve}% na 17/18`,
    drilled: `${details.drilled} de broca`,
    foulness: `${details.foulness} de impureza`,
    description: details.description,
    type: '',
    weightPerBag: '',
  }
  const labelByTypeName: Record<CoffeeTypes, string> = {
    bica_corrida: 'BC',
    conilon: 'CON',
    despolpado: 'DESP',
    escolha: 'ESC',
  }
  const fullDescription = Object.entries(details).reduce((acc, [key, value]) => {
    const messageValue = messageByDetail[key as keyof CoffeeDetails]
    const isNumber = typeof value === 'number'
    if (isNumber && value === 0) return acc
    if (messageValue) return acc + messageValue + ' '
    return acc
  }, '')

  return (
    <Tr>
      <Td px={padding}>
        {getNumberOfBags(transaction.type.value, transaction.details.weightPerBag)}
      </Td>
      <Td px={padding} title={capitalCase(transaction.type.name)}>
        {labelByTypeName[transaction.type.name]}
      </Td>
      <Td px={padding}>{CoffeeDetailsTypesEnum[details.type]}</Td>
      <Td px={padding} title={fullDescription}>
        {fullDescription}
      </Td>
      <Td px={padding}>{dateToFormat(transaction.createdAt)}</Td>
      <Td px={padding} textAlign='center'>
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
