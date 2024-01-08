import { type Timestamp } from '../../../../shared/types/Timestamp'
import { type WithId } from '../../../../shared/types/WithId'

export type FertilizerModel = WithId<{
  name: string
  quantity: number
  description?: string
}> &
  Timestamp

export type FertilizerFormValues = {
  name: string
  quantity: number
  description?: string
}

export type FertilizerDetails = {
  pricePerBag: number
}
