import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getPickupOrdersService, getPickupPdf } from '../../services/Pickup/get'
import { PickupCoffeeStatuses } from '../../types/model/pickup'

const initialStatus = PickupCoffeeStatuses.PENDING

export default function usePickupView(): UsePickupView {
  const { getParam } = useURLSearchParams()
  const params = useServiceParams()
  const currentStatus = getParam('status') as PickupCoffeeStatuses | null
  const order = getPickupOrdersService(
    `${params}${currentStatus ? '' : `&status=${initialStatus}`}`,
  )
  const openModal = useModal((state) => state.openModal)

  async function handleOpenForm(): Promise<void> {
    try {
      const CreateCoffeePickup = (await import('../../components/Pickup/Create')).default
      openModal(
        <CreateCoffeePickup
          onSuccess={() => {
            void order.mutate?.()
          }}
        />,
      )
    } catch (e) {
      console.error(e)
    }
  }

  async function handleDownloadList(): Promise<void> {
    await getPickupPdf()
  }

  return {
    handleOpenForm,
    handleDownloadList,
  }
}

type UsePickupView = {
  handleOpenForm: () => Promise<void>
  handleDownloadList: () => Promise<void>
}
