export type CreatePickupInputDto = {
  clientId: string
  clientName: string
  bags: number
  complement: string
  brook: string
}

export type UpdatePickupInputDto = Partial<CreatePickupInputDto>
