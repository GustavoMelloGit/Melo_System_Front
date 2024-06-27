import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { DeleteServiceResponse } from '../../../shared/types/service/DeleteServiceResponse'
import { PostServiceResponse } from '../../../shared/types/service/PostServiceResponse'
import { PutServiceResponse } from '../../../shared/types/service/PutServiceResponse'
import { FertilizerDeliveryModel, FertilizerDeliveryStatuses } from '../types/model/Delivery'
import { FertilizerModel } from '../types/model/Fertilizer'
import {
  CreateFertilizerInputDto,
  DeliveryFertilizerInputDto,
  UpdateFertilizerInputDto,
} from './FertilizerService.dto'

export class FertilizerService {
  static async create(values: CreateFertilizerInputDto): PostServiceResponse<FertilizerModel> {
    try {
      const { data } = await api.post('/fertilizers', values)

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }

  static async deliveryFertilizer(
    values: DeliveryFertilizerInputDto,
  ): PostServiceResponse<FertilizerDeliveryModel> {
    try {
      const { data } = await api.post('/fertilizers/delivery', values)

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }

  static async fertilizerDelivered(id: string): PutServiceResponse<FertilizerDeliveryModel> {
    try {
      const { data } = await api.put(`/fertilizers/delivery/${id}`, {
        status: FertilizerDeliveryStatuses.COMPLETED,
      })

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }

  static async fertilizerDeliveryCanceled(id: string): PutServiceResponse<FertilizerDeliveryModel> {
    try {
      const { data } = await api.put(`/fertilizers/delivery/${id}`, {
        status: FertilizerDeliveryStatuses.PENDING,
      })

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }

  static async update(
    id: string,
    value: Partial<FertilizerModel>,
  ): PutServiceResponse<FertilizerModel> {
    try {
      const { data } = await api.put(`/fertilizers/${id}`, value)

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }

  static async updateFertilizerDelivery(
    id: string,
    values: UpdateFertilizerInputDto,
  ): PutServiceResponse<FertilizerDeliveryModel> {
    try {
      const { data } = await api.put(`/fertilizers/delivery/${id}`, values)

      return {
        data,
        error: null,
      }
    } catch (e) {
      return {
        error: errorHandler(e),
        data: null,
      }
    }
  }

  static async delete(id: string): DeleteServiceResponse {
    try {
      await api.delete(`/fertilizers/${id}`)
      return {
        error: null,
      }
    } catch (err) {
      return {
        error: errorHandler(err),
      }
    }
  }
}
