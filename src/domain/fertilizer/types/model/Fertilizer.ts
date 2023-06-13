import { type Timestamp, type WithId } from '../../../../shared/types/utils/model'

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
