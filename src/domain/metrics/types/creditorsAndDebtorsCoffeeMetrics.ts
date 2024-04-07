import { type WithId } from '../../../shared/types/WithId'
import { type ClientModel } from '../../client/types/model/Client'

export type CreditorsAndDebtorsCoffeeMetric = WithId<
  Pick<ClientModel, 'code' | 'name'> & {
    balance: number
  }
>
