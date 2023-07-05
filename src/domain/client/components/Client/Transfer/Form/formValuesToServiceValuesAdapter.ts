import { formatBagsIntoWeight } from '../../../../../../lib/utils/formatters'
import {
  type TransferBetweenClientsReferralData,
  type TransferBetweenClientsServiceData,
} from '../../../../service'
import { type ClientTransferFormValues, type ReferralTransfer } from './types'

const formatReferralData = (referralData: ReferralTransfer): TransferBetweenClientsReferralData => {
  const { clientId, transferType } = referralData
  const transferValue =
    transferType === 'currency'
      ? referralData.value * 100
      : formatBagsIntoWeight(Number(referralData.bags), Number(referralData.weight))

  const transferData: TransferBetweenClientsReferralData = {
    clientId,
    item: {
      type: transferType === 'currency' ? 'currency' : referralData.bebida,
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
  const { from, to } = values
  const fromValues: TransferBetweenClientsReferralData = formatReferralData(from)
  const toValues: TransferBetweenClientsReferralData = formatReferralData(to)

  return {
    from: fromValues,
    to: toValues,
    description: values.description,
  }
}
