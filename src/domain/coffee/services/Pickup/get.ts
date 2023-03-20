import { type AxiosResponse } from 'axios'
import api from '../../../../lib/config/api'
import { errorHandler } from '../../../../lib/utils/error'
import useFetch from '../../../../shared/hooks/useFetch'
import { type GetServiceResponse } from '../../../../shared/types/utils/service'
import { type PickupCoffeeModel } from '../../types/model/pickup'

export function getPickupOrdersService(params?: string): GetServiceResponse<PickupCoffeeModel[]> {
  const { data, error, isLoading, mutate } = useFetch(`/orders?${params ?? ''}`)

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total,
    mutate,
  }
}

export async function getPickupPdf(): Promise<void> {
  try {
    const response: AxiosResponse<Blob> = await api.get('/orders/pdf', {
      responseType: 'blob',
    })
    const url = URL.createObjectURL(response.data)
    window.open(url, '_blank')
  } catch (error) {
    console.error(error)
  }
}
