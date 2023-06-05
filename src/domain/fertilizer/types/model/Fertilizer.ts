import { type Timestamp, type WithId } from '../../../../shared/types/utils/model'

export type FertilizerModel = WithId<{
  name: string
  description?: string
}> &
  Timestamp

export type FertilizerFormValues = {
  name: string
  description?: string
}
