export type PickupCoffee = {
  id: string
  clientName: string
  address: string
  bags: number
  status: PickupCoffeeStatuses
}

export type PickupFormValues = {
  clientName: string
  bags: number
  address: string
}

export enum PickupCoffeeStatuses {
  PENDING = 'inProgress',
  COMPLETED = 'done',
  CANCELLED = 'canceled',
}
