import { type ClientModel } from '../../../client/types/model/Client'

export type PickupCoffeeModel = {
  id: string
  client: ClientModel
  clientId: string
  bags: number
  brook: string
  complement: string
  status: PickupCoffeeStatuses
  createdAt: number
  updatedAt: number
}

export type PickupFormValues = {
  clientId: string
  clientName: string
  bags: number
  complement: string
  brook: string
}

export enum PickupCoffeeStatuses {
  PENDING = 'inProgress',
  COMPLETED = 'done',
  CANCELLED = 'canceled',
}
