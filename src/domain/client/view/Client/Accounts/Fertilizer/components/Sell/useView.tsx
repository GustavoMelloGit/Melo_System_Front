import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { getFertilizerByNameService } from '../../../../../../../fertilizer/services/get'
import { type SellFertilizerFormValues } from './types'

const useSellFertilizerView = (): UseSellFertilizerView => {
  const closeModal = useModal((state) => state.closeModal)

  async function handleSellFertilizer(
    clientId: string,
    values: SellFertilizerFormValues,
  ): Promise<void> {
    const fertilizer = await getFertilizerByNameService(values.fertilizerName)
    console.log('fertilizer', fertilizer)
    console.log(clientId, values)
  }

  return {
    closeModal,
    handleSellFertilizer,
  }
}
type UseSellFertilizerView = {
  closeModal: () => void
  handleSellFertilizer: (clientId: string, values: SellFertilizerFormValues) => Promise<void>
}

export default useSellFertilizerView
