import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { updateFertilizerService } from '../../../services/put'
import { type CreditFertilizerFormValues } from './types'

export default function useCreditFertilizerView() {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreditFertilizer(
    id: string,
    values: CreditFertilizerFormValues,
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
