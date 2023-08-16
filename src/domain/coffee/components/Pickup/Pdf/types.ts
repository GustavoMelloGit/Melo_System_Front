export type PickupPDFData = Record<
  string,
  Array<{
    client: string
    bags: number
    address: string
    id: string
  }>
>
