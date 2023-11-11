import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type StockProductFormValues } from '../../../components/Stock/Form/types'
import { createStockProductService } from '../../../services/createStockProductService'

type Props = {
  onSuccess: () => void
}
export default function useCreateProductView({ onSuccess }: Props): UseCreateFertilizerView {
  const closeModal = useModal((state) => state.closeModal)
  async function handleAddFertilizer(values: StockProductFormValues): Promise<void> {
    const { error } = await createStockProductService(values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Produto adicionado com sucesso!')
    closeModal()
    onSuccess()
  }
  return {
    handleAddFertilizer,
  }
}

type UseCreateFertilizerView = {
  handleAddFertilizer: (values: StockProductFormValues) => Promise<void>
}
