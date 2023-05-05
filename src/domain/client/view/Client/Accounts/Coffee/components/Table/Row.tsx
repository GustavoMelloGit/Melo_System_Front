import { Td, Tr } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { useState } from 'react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import { pluralize } from '../../../../../../../../lib/utils/utils'
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
  const [showText, setShowText] = useState(false)
  const { details } = transaction
  const messageByDetail: Record<keyof CoffeeDetails, string> = {
    moisture: `${details.moisture} de umidade`,
    picking: `${details.picking} de cata`,
    sieve: `${details.sieve}% na 17/18`,
    drilled: `${details.drilled} de broca`,
    foulness: `${details.foulness} de impureza`,
    description: details.description,
    bebida: '',
    weightPerBag: '',
    coffeeType: '',
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
      <Td px={padding} w={120}>
        {dateToFormat(transaction.date)}
      </Td>
      <Td
        px={padding}
        title={fullDescription}
        cursor='pointer'
        onClick={() => {
          setShowText((prev) => !prev)
        }}
        overflow='hidden'
        maxW={200}
        wordBreak='break-word'
        whiteSpace={showText ? 'pre-wrap' : 'nowrap'}
        textOverflow={showText ? 'unset' : 'ellipsis'}
      >
        {getNumberOfBags(transaction.type.value, transaction.details.weightPerBag)}{' '}
        {fullDescription}
      </Td>

      <Td px={padding} title={capitalCase(transaction.type.name)} w='120px'>
        {labelByTypeName[transaction.details.coffeeType]}
      </Td>
      <Td px={padding} w='150px'>
        {CoffeeDetailsTypesEnum[details.bebida]}
      </Td>
      <Td px={padding} w='120px' color={getColorByValue(transaction.clientBalance)}>
        {transaction.clientBalance} {pluralize('Kg', transaction.clientBalance)}
      </Td>
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
