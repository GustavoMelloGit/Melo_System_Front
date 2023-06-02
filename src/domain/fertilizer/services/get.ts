import useFetch from '../../../shared/hooks/useFetch'
import { type HTTPGetResponse, type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type Fertilizer } from '../types/model/Fertilizer'

export function getFertilizersService(): SWRServiceResponse<Fertilizer[]> {
  const response = useFetch<HTTPGetResponse<Fertilizer[]>>(`/fertilizers`)

  return response
}
