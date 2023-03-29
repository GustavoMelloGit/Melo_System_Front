import { type Responsible, type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type ClientModel } from '../../../client/types/model/Client'
import { type CoffeeDetails } from './coffee'

export type LineModel = {
  weight: number
  bags: number
} & Timestamp &
  Responsible

export type SheetModel = WithId<
  {
    clientId: string
    bookId: string
    number: number
    weighingDate: string
    client: Pick<ClientModel, 'name'>
    coffeeDetails: CoffeeDetails
    coffeeType: string
    courier: string
    lines: Array<WithId<LineModel>>
    isDraft: boolean
  } & Timestamp &
    Responsible
>

export type SheetFormValues = {
  isDraft: boolean
  weighingDate: string
  number: number
  courier: string
  coffeeDetails: CoffeeDetails
  coffeeType: string
  clientId: string
  lines: Array<{
    weight: number
    bags: number
  }>
}
