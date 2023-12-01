import { type Timestamp } from '../../../shared/types/Timestamp'
import { type WithId } from '../../../shared/types/WithId'

export type ProductModel = WithId<{
  name: string
  quantity: number
  description?: string
  cost: number
  sale: number
}> &
  Timestamp

export type FertilizerDetails = {
  pricePerBag: number
}
