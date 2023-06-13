import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { getFertilizerByNameService } from '../../../../../../../fertilizer/services/get'
import { sellFertilizerService } from '../../services/post'
import { type SellFertilizerFormValues } from './types'

const useSellFertilizerView = (): UseSellFertilizerView => {
  const closeModal = useModal((state) => state.closeModal)

  async function handleSellFertilizer(
    clientId: string,
    values: SellFertilizerFormValues,
  ): Promise<void> {
    const { fertilizerName, ...formValues } = values
    const fertilizer = await getFertilizerByNameService(fertilizerName)
    if (!fertilizer.data) {
      toast.error('Fertilizante não encontrado, favor verificar o nome digitado')
      return
    }
    const { error } = await sellFertilizerService({
      clientId,
      ...formValues,
      fertilizerId: fertilizer.data?.id,
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
  handleSellFertilizer: (clientId: string, values: SellFertilizerFormValues) => Promise<void>
}

export default useSellFertilizerView
