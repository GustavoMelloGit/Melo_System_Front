export type SellProductFormValues = {
  client: string
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

export const EmptyProduct: ProductFormValues = {
  deliveryDate: new Date().toISOString().split('T')[0],
  productId: '',
  productName: '',
  price: 0,
  quantity: 1,
  shouldDeliver: false,
  brook: '',
  complement: '',
  description: '',
}
