export type SellProductFormValues = {
  products: ProductFormValues[]
}

export type ProductFormValues = {
  shouldDeliver: boolean
  productName: string
  productId: string
  quantity: number
  price: number
  deliveryDate: string
  brook?: string
  complement?: string
  description?: string
}
