import useFetch from '../../../shared/hooks/useFetch'
import { type HTTPGetResponse, type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type FertilizerModel } from '../types/model/Fertilizer'

export function getFertilizersService(): SWRServiceResponse<FertilizerModel[]> {
  const response = useFetch<HTTPGetResponse<FertilizerModel[]>>(`/fertilizers`)

  return response
}
