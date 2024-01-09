import { useCallback, useEffect } from 'react'
import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { type GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../shared/types/service/SWRServiceResponse'
import { PickupEmitter } from '../../events/pickup'
import { useGetPickupOrdersService } from '../../services/Pickup/get'
import { PickupCoffeeStatuses, type PickupCoffeeModel } from '../../types/model/pickup'

const initialStatus = PickupCoffeeStatuses.PENDING

export default function usePickupView(): UsePickupView {
  const { getParam } = useURLSearchParams()
  const params = useServiceParams()
  const currentStatus = getParam('status') as PickupCoffeeStatuses | null
  const order = useGetPickupOrdersService(
    `${params}${currentStatus ? '' : `&status=${initialStatus}`}`,
  )
  const openModal = useModal((state) => state.openModal)

  async function handleOpenForm(): Promise<void> {
    try {
      const CreateCoffeePickup = (await import('../../components/Pickup/Create')).default
      openModal(<CreateCoffeePickup />)
    } catch (e) {
      console.error(e)
    }
  }

  const refetchData = useCallback(async () => {
    await order.mutate()
  }, [order.mutate])

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
    handleOpenForm,
    order,
  }
}

type UsePickupView = {
  handleOpenForm: () => Promise<void>
  order: SWRServiceResponse<GetListResponse<PickupCoffeeModel[]>>
}
