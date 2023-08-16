import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'

export type FertilizerDeliveryPDFItem = Pick<
  FertilizerDeliveryModel,
  'client' | 'complement' | 'brook' | 'fertilizer' | 'amount' | 'id' | 'date'
>
export type FertilizerDeliveryPDFData = Record<string, FertilizerDeliveryPDFItem[]>
