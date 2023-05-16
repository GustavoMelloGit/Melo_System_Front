import { Collapse, Td, Tr } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { useState } from 'react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import {
  CoffeeBebidasLabel,
  type CoffeeBebidas,
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
    moisture: `${details.moisture}% de umidade`,
    picking: `${details.picking}% de cata`,
    sieve: `${details.sieve}% na 17/18`,
    drilled: `${details.drilled}% de broca`,
    foulness: `${details.foulness}% de impureza`,
    description: `${details.description}`,
    bebida: '',
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
    if (!value) return acc
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
        maxW={200}
        wordBreak='break-word'
        whiteSpace='pre-wrap'
      >
        <Collapse startingHeight={20} in={showText}>
          {fullDescription}
        </Collapse>
      </Td>

      <Td px={padding} title={capitalCase(transaction.details.coffeeType)} w='120px'>
        {labelByTypeName[transaction.details.coffeeType]}
      </Td>
      <Td px={padding} w='150px'>
        {CoffeeBebidasLabel[transaction.type.name as CoffeeBebidas]}
      </Td>
      <Td px={padding} w='120px' color={getColorByValue(transaction.type.value)}>
        {getNumberOfBags(transaction.type.value)}
      </Td>
      <Td px={padding} w='120px' color={getColorByValue(transaction.clientBalance)}>
        {getNumberOfBags(transaction.clientBalance)}
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
