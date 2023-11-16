import { createEmitter } from '../../../../../../../lib/utils/createEmitter'
import { type BuyCoffeeFormValues, type CoffeeFormValues } from '../types'

export const CoffeeAccountEmitter = createEmitter<{
  coffeeCreated: CoffeeFormValues
  coffeeBought: BuyCoffeeFormValues
}>()
