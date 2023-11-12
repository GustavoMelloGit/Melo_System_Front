import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/getColorByValue'
import { getNumberOfBags } from '../../../../../../../../lib/utils/getNumberOfBags'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import {
  CoffeeBebidasLabel,
  type CoffeeDetails,
  type CoffeeTypes,
} from '../../../../../../../coffee/types/model/coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'

function getFullDescription(transaction: CoffeeTransactionModel): string {
  if (transaction.details) {
    const { details } = transaction
    const messageByDetail: Record<keyof CoffeeDetails, string> = {
      picking: `${details.picking}% de cata`,
      sieve: `${details.sieve}% na 17/18`,
      moisture: `${details.moisture}% de umidade`,
      drilled: `${details.drilled}% de broca`,
      foulness: `${details.foulness}% de impureza`,
      description: `${details.description}`,
      bebida: '',
      coffeeType: '',
    }

    const sortedDetails: CoffeeDetails = {
      picking: details.picking,
      sieve: details.sieve,
      moisture: details.moisture,
      drilled: details.drilled,
      foulness: details.foulness,
      description: details.description,
      bebida: details.bebida,
      coffeeType: details.coffeeType,
    }
    const detailsDescription = Object.entries(sortedDetails).reduce((acc, [key, value]) => {
      const messageValue = messageByDetail[key as keyof CoffeeDetails]
      if (!value) return acc
      if (messageValue) return acc + messageValue + ' '
      return acc
    }, '')

    const withTransactionDescription = `${detailsDescription} ${
      transaction.description ? transaction.description : ''
    }`
    return withTransactionDescription
  }

  return transaction.description
}

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

  const fullDescription: string = getFullDescription(transaction)
  const coffeeTypeColumnValue: string = transaction.details
    ? labelByTypeName[transaction.details.coffeeType]
    : '--'

  return (
    <Tr>
      <Td w={120}>{dateToFormat(transaction.date)}</Td>
      <Td title={coffeeTypeColumnValue}>{coffeeTypeColumnValue}</Td>
      <Td>{CoffeeBebidasLabel[transaction.type.name]}</Td>
      <Td>{fullDescription || transaction.description}</Td>
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
          placement='left'
        />
      </Td>
    </Tr>
  )
}
