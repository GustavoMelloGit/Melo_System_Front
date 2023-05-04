import { type Responsible, type Timestamp, type WithId } from '../../../../shared/types/utils/model'
import { type ClientModel } from '../../../client/types/model/Client'
import {
  type CoffeeDetails,
  type CoffeeTypes,
  type DespolpadoDetails,
  type EscolhaDetails,
} from './coffee'

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
    weighingDate: number
    client: Pick<ClientModel, 'name'>
    coffeeDetails: CoffeeDetails
    coffeeType: CoffeeTypes
    courier: string
    lines: Array<WithId<LineModel>>
    isDraft: boolean
    weightPerBag: number
  } & Timestamp &
    Responsible
>

export type SheetFormValues = {
  isDraft: boolean
  weighingDate: string
  weightPerBag: number
  number: number
  courier: string
  coffeeDetails: Partial<CoffeeDetails | DespolpadoDetails | EscolhaDetails>
  clientId: string
  lines: Array<{
    weight: number
    bags: number
  }>
}
