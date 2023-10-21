import { type WithId } from '../../../shared/types/WithId'
import { type ClientModel } from '../../client/types/model/Client'
import { type CoffeeBebidas } from '../../coffee/types/model/coffee'

export type ClientCoffeeMetric = WithId<
  Pick<ClientModel, 'code' | 'name'> & {
    balance: {
      type: CoffeeBebidas
      total: number
    }
  }
>
