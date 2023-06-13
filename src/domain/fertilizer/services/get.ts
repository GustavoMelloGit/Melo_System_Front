import { type AxiosResponse } from 'axios'
import { type SWRConfiguration } from 'swr'
import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/error'
import useFetch from '../../../shared/hooks/useFetch'
import {
  type GetServiceResponse,
  type HTTPGetResponse,
  type SWRServiceResponse,
} from '../../../shared/types/utils/service'
import { type FertilizerDeliveryModel } from '../types/model/Delivery'
import { type FertilizerModel } from '../types/model/Fertilizer'

export function getFertilizersService(
  params?: string,
  config?: SWRConfiguration,
): SWRServiceResponse<HTTPGetResponse<FertilizerModel[]>> {
  const response = useFetch<HTTPGetResponse<FertilizerModel[]>>(
    `/fertilizers?${params ?? ''}`,
    config,
  )

  return response
}

export async function getFertilizerByNameService(
  name: string,
): Promise<GetServiceResponse<FertilizerModel>> {
  try {
    const response = await api.get<HTTPGetResponse<FertilizerModel[]>>(`/fertilizers?name=${name}`)
    const sameNameFertilizers = response.data.data.filter((fertilizer) => fertilizer.name === name)
    return {
      data: sameNameFertilizers[0],
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}

export function getFertilizersDeliveryService(
  params?: string,
): SWRServiceResponse<HTTPGetResponse<FertilizerDeliveryModel[]>> {
  const response = useFetch<HTTPGetResponse<FertilizerDeliveryModel[]>>(
    `/fertilizers/delivery?${params ?? ''}`,
  )

  return response
}

export async function getFertilizersDeliveryPdf(): Promise<void> {
  try {
    const response: AxiosResponse<Blob> = await api.get('/fertilizers/delivery/pdf', {
      responseType: 'blob',
    })
    const url = URL.createObjectURL(response.data)
    window.open(url, '_blank')
  } catch (error) {
    console.error(error)
  }
}
