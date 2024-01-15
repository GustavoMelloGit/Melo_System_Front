import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { updateFertilizerService } from '../../../../fertilizer/services/put'
import { type CreditStockProductFormValues } from './types'

export default function useCreditStockProductView(): UseCreditFertilizerView {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreditFertilizer(
    id: string,
    values: CreditStockProductFormValues,
  ): Promise<void> {
    const { error } = await updateFertilizerService(id, values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Estoque atualizado com sucesso')
    closeModal()
  }

  return {
    closeModal,
    handleCreditFertilizer,
  }
}

type UseCreditFertilizerView = {
  closeModal: () => void
  handleCreditFertilizer: (id: string, values: CreditStockProductFormValues) => Promise<void>
}
