import { type CoffeeDetails } from '../../../../../../coffee/types/model/coffee'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'

export function getFullDescriptionFromCoffeeTransaction(
  transaction: CoffeeTransactionModel,
): string {
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
    return withTransactionDescription || transaction.description
  }

  return transaction.description
}
