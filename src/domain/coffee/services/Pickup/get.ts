import { type AxiosResponse } from 'axios'
import api from '../../../../lib/config/api'
import useFetch from '../../../../shared/hooks/useFetch'
import {
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { type PickupCoffeeModel } from '../../types/model/pickup'

export function getPickupOrdersService(
  params?: string,
): SWRServiceResponse<HTTPGetResponse<PickupCoffeeModel[]>> {
  const response = useFetch<HTTPGetResponse<PickupCoffeeModel[]>>(`/orders?${params ?? ''}`)

  return response
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
