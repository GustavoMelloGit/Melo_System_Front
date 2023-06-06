import { type SWRConfiguration } from 'swr'
import useFetch from '../../../shared/hooks/useFetch'
import { type HTTPGetResponse, type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type FertilizerModel } from '../types/model/Fertilizer'

export function getFertilizersService(
  params?: string,
  config?: SWRConfiguration,
): SWRServiceResponse<FertilizerModel[]> {
  const response = useFetch<HTTPGetResponse<FertilizerModel[]>>(
    `/fertilizers?${params ?? ''}`,
    config,
  )

  return response
}
