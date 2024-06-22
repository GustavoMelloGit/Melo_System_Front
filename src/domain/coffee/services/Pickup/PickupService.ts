import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/errorHandler'
import { PostServiceResponse } from '../../../../shared/types/service/PostServiceResponse'
import { PutServiceResponse } from '../../../../shared/types/service/PutServiceResponse'
import { PickupCoffeeModel, PickupCoffeeStatuses } from '../../types/model/pickup'
import { CreatePickupInputDto, UpdatePickupInputDto } from './PickupService.dto'

export class PickupService {
  static async create(values: CreatePickupInputDto): PostServiceResponse<PickupCoffeeModel> {
    try {
      const { data } = await api.post('/orders', values)

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
    values: UpdatePickupInputDto,
  ): Promise<PutServiceResponse<PickupCoffeeModel>> {
    try {
      const { data } = await api.put(`/orders/${id}`, values)

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

  static async markAsDone(id: string): Promise<PutServiceResponse<PickupCoffeeModel>> {
    try {
      const { data } = await api.put(`/orders/${id}`, {
        status: PickupCoffeeStatuses.COMPLETED,
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

  static async markAsPending(id: string): Promise<PutServiceResponse<PickupCoffeeModel>> {
    try {
      const { data } = await api.put(`/orders/${id}`, {
        status: PickupCoffeeStatuses.PENDING,
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
}
