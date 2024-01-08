import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { type GetListResponse } from '../../../../../shared/types/service/GetListResponse'
import { PickupEmitter } from '../../../../coffee/events/pickup'
import { getPickupOrdersService } from '../../../../coffee/services/Pickup/get'
import { type PickupCoffeeModel } from '../../../../coffee/types/model/pickup'
import { getClientService } from '../../../service'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientPickupView(): UseClientPickupView {
  const { uuid } = useParams()
  const { data: pickupData, isLoading, mutate } = getPickupOrdersService(`clientId=${uuid ?? ''}`)
  const { data: client } = getClientService(uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    PickupEmitter.on('pickupChecked', refetchData)
    PickupEmitter.on('pickupUnchecked', refetchData)
    PickupEmitter.on('pickupUpdated', refetchData)
    PickupEmitter.on('pickupCreated', refetchData)

    return () => {
      PickupEmitter.off('pickupChecked', refetchData)
      PickupEmitter.off('pickupUnchecked', refetchData)
      PickupEmitter.off('pickupUpdated', refetchData)
      PickupEmitter.off('pickupCreated', refetchData)
    }
  }, [refetchData])

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
