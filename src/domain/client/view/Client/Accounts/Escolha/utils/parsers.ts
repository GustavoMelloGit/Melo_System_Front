import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'

export function parseEscolhaTransactionDescription(transaction: EscolhaTransactionModel): string {
  let description = transaction.description

  if (transaction.details.description) {
    description += ` - ${transaction.details.description}`
  }

  return description
}
