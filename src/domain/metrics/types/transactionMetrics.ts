import { type WithId } from '../../../shared/types/utils/model'
import { type ClientModel } from '../../client/types/model/Client'
import { type AllTransactions } from '../../client/types/model/Transaction'

export type TransactionMetrics = WithId<{
  props: AllTransactions & {
    client: ClientModel
  }
}>

export type GetTransactionMetricsResponse = {
  data: TransactionMetrics[]
}

export type TransactionMetricsFilterOptions = {
  type: string
  startDate: string
  endDate: string
}
