import { createEmitter } from '../../../../../../../lib/utils/createEmitter'
import { type SellProductFormValues } from '../../../../../../product/components/Sell/Form/types'

export const ProductAccountEmitter = createEmitter<{
  productSold: SellProductFormValues
}>()
