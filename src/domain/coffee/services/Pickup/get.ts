import { errorHandler } from '../../../../lib/utils/error'
import useFetch from '../../../../shared/hooks/useFetch'
import { type GetServiceResponse } from '../../../../shared/types/utils/service'
import { type PickupCoffee } from '../../types/model/pickup'

export function getPickupOrders(params?: string): GetServiceResponse<PickupCoffee[]> {
  const { data, error, isLoading, mutate } = useFetch(`/orders?${params ?? ''}`)

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total,
    mutate,
  }
}
