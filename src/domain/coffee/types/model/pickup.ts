export type PickupCoffeeModel = {
  id: string
  clientName: string
  bags: number
  brook: string
  complement: string
  status: PickupCoffeeStatuses
}

export type PickupFormValues = {
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
