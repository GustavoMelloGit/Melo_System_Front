import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type StockProductFormValues } from '../../../components/Stock/Form/types'
import { ProductEmitter } from '../../../events/ProductEmitter'
import { updateStockProductService } from '../../../services/updateStockProductService'

export default function useUpdateProductView(): UseUpdateFertilizerView {
  const closeModal = useModal((state) => state.closeModal)

  async function updateProductHandler(
    productId: string,
    values: StockProductFormValues,
  ): Promise<void> {
    const { error } = await updateStockProductService(productId, values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Produto adicionado com sucesso!')
    closeModal()
    ProductEmitter.emit('productUpdated', values)
  }

  return {
    updateProductHandler,
  }
}

type UseUpdateFertilizerView = {
  updateProductHandler: (productId: string, values: StockProductFormValues) => Promise<void>
}
