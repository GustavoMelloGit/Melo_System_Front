import { type WithId } from '../../../shared/types/utils/model'
import {
  type AllTransactions,
  type TransactionTypeName,
} from '../../client/types/model/Transaction'

export type TransactionMetrics = WithId<{
  props: AllTransactions
}>

export type GetTransactionMetricsResponse = {
  data: TransactionMetrics[]
}

export type GetTransactionMetricsParams = {
  startDate: string // ISOString
  endDate: string // ISOString
  type: TransactionTypeName
}
