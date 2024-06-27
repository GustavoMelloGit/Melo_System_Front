export type DeliveryFertilizerInputDto = {
  clientId: string
  amount: number
  fertilizerId: string
  brook: string
  complement: string
  date: string
}

export type CreateFertilizerInputDto = {
  name: string
  quantity: number
  description?: string
}

export type UpdateFertilizerInputDto = {
  clientName: string
  amount: number
  fertilizerId: string
  brook: string
  complement: string
  date: string
}
