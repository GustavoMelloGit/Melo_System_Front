import { useParams } from 'react-router-dom'
import { type GetListResponse } from '../../../../../shared/types/utils/service'
import { getPickupOrdersService } from '../../../../coffee/services/Pickup/get'
import { type PickupCoffeeModel } from '../../../../coffee/types/model/pickup'
import { getClientService } from '../../../service'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientPickupView(): UseClientPickupView {
  const { uuid } = useParams()
  const { data: pickupData, isLoading } = getPickupOrdersService(`clientId=${uuid ?? ''}`)
  const { data: client } = getClientService(uuid ?? '')

  return {
    pickupData,
    isLoading,
    client,
    clientId: uuid as string,
  }
}

type UseClientPickupView = {
  pickupData: GetListResponse<PickupCoffeeModel[]> | undefined
  isLoading: boolean
  client: ClientModel | undefined
  clientId: string
}
