import { createEmitter } from '../../../lib/utils/createEmitter'
import { type StockProductFormValues } from '../components/Stock/Form/types'

export const ProductEmitter = createEmitter<{
  productCreated: StockProductFormValues
  productUpdated: StockProductFormValues
  productDeleted: string
  productCredited: string
}>()
