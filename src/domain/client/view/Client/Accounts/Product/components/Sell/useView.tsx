import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { sellFertilizerService } from '../../services/post'
import { type SellProductFormValues } from './types'

const useSellProductView = (): UseSellFertilizerView => {
  const closeModal = useModal((state) => state.closeModal)

  async function handleSellFertilizer(
    clientId: string,
    values: SellProductFormValues,
  ): Promise<void> {
    const { fertilizerName, ...formValues } = values
    const { error } = await sellFertilizerService({
      clientId,
      ...formValues,
    })
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Fertilizante vendido com sucesso')
    closeModal()
  }

  return {
    closeModal,
    handleSellFertilizer,
  }
}
type UseSellFertilizerView = {
  closeModal: () => void
  handleSellFertilizer: (clientId: string, values: SellProductFormValues) => Promise<void>
}

export default useSellProductView
