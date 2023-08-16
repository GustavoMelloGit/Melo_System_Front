import { createEmitter } from '../../../lib/utils/createEmitter'
import { type FertilizerDeliveryModel } from '../types/model/Delivery'

export const DeliveryEmitter = createEmitter<{
  deliveryCreated: FertilizerDeliveryModel
  deliveryChanged: FertilizerDeliveryModel
}>()
