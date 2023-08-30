import { formatBagsIntoWeight } from '../../../../../../lib/utils/formatters'
import {
  type ServiceTransferType,
  type TransferBetweenClientsReferralData,
  type TransferBetweenClientsServiceData,
} from '../../../../service'
import { type ClientTransferFormValues, type ReferralTransfer } from './types'

const getValueBasedOnType = (referralData: ReferralTransfer): number => {
  let value: number = 0
  switch (referralData.transferType) {
    case 'bags':
      value = Number(referralData.value)
      break
    case 'coffee':
      value = formatBagsIntoWeight(Number(referralData.bags), Number(referralData.weight))
      break
    case 'escolha':
      value = formatBagsIntoWeight(Number(referralData.bags), Number(referralData.weight))
      break
    case 'currency':
      value = Number(referralData.value) * 100
      break
    default:
      value = 0
  }

  return value
}
const getTypeBasedOnTransferType = (referralData: ReferralTransfer): ServiceTransferType => {
  let type: ServiceTransferType
  switch (referralData.transferType) {
    case 'coffee':
      type = referralData.bebida
      break
    case 'bags':
      type = 'bags'
      break
    case 'currency':
      type = 'currency'
      break
    case 'escolha':
      type = 'escolha'
      break
    default:
      type = 'currency'
  }

  return type
}

const formatReferralData = (referralData: ReferralTransfer): TransferBetweenClientsReferralData => {
  const { clientId, transferType } = referralData
  const transferValue: number = getValueBasedOnType(referralData)

  const transferData: TransferBetweenClientsReferralData = {
    clientId,
    item: {
      type: getTypeBasedOnTransferType(referralData),
      value: transferValue,
      ...(transferType === 'coffee' && {
        details: {
          coffeeType: referralData.coffeeType,
        },
      }),
    },
  }

  return transferData
}

export const formValuesToServiceValuesAdapter = (
  values: ClientTransferFormValues,
): TransferBetweenClientsServiceData => {
  console.log(values)
  const { from, to } = values
  const fromValues: TransferBetweenClientsReferralData = formatReferralData(from)
  const toValues: TransferBetweenClientsReferralData = formatReferralData(to)

  return {
    from: fromValues,
    to: toValues,
    description: values.description,
  }
}
