import { type FertilizerModel } from './Fertilizer'

export type FertilizerDeliveryModel = {
  id: string
  clientName: string
  amount: number
  fertilizer: FertilizerModel
  brook: string
  complement: string
  status: FertilizerDeliveryStatuses
}

export type FertilizerDeliveryFormValues = {
  clientName: string
  amount: number
  fertilizerId: string
  brook: string
  complement: string
}

export enum FertilizerDeliveryStatuses {
  PENDING = 'inProgress',
  COMPLETED = 'done',
  CANCELLED = 'cancelled',
}
