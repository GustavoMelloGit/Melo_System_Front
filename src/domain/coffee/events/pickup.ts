import { createEmitter } from '../../../lib/utils/createEmitter'
import { type PickupCoffeeModel } from '../types/model/pickup'

export const PickupEmitter = createEmitter<{
  pickupChecked: PickupCoffeeModel
  pickupUnchecked: PickupCoffeeModel
  pickupUpdated: PickupCoffeeModel
  pickupCreated: PickupCoffeeModel
}>()
