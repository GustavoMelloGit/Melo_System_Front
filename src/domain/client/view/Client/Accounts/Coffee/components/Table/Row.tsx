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
      <Td w={120}>{dateToFormat(transaction.date)}</Td>
      <Td
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
          {fullDescription || transaction.description}
        </Collapse>
      </Td>

      <Td title={capitalCase(transaction.details.coffeeType)}>
        {labelByTypeName[transaction.details.coffeeType]}
      </Td>
      <Td>{CoffeeBebidasLabel[transaction.type.name as CoffeeBebidas]}</Td>
      <Td color={getColorByValue(transaction.type.value)}>
        {getNumberOfBags(transaction.type.value)}
      </Td>
      <Td color={getColorByValue(transaction.clientBalance)}>
        {getNumberOfBags(transaction.clientBalance)}
      </Td>
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
