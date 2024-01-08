import { type ClientModel } from '../../../client/types/model/Client'
import { type FertilizerModel } from './Fertilizer'

export type FertilizerDeliveryModel = {
  id: string
  client: ClientModel
  amount: number
  fertilizer: FertilizerModel
  brook: string
  complement: string
  status: FertilizerDeliveryStatuses
  date: number
}

export type FertilizerDeliveryFormValues = {
  clientName: string
  clientId: string
  amount: number
  fertilizerId: string
  fertilizerName: string
  brook: string
  complement: string
  date: string
}

export enum FertilizerDeliveryStatuses {
  PENDING = 'inProgress',
  COMPLETED = 'done',
  CANCELLED = 'cancelled',
}
