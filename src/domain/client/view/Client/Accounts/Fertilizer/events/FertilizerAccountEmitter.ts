import { createEmitter } from '../../../../../../../lib/utils/createEmitter'
import { type SellFertilizerFormValues } from '../components/Sell/types'

export const FertilizerAccountEmitter = createEmitter<{
  fertilizerSold: SellFertilizerFormValues
}>()
