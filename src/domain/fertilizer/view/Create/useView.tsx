import { toast } from 'react-hot-toast'
import { useModal } from '../../../../shared/hooks/useModal'
import { createFertilizerService } from '../../services/post'
import { type FertilizerFormValues } from '../../types/model/Fertilizer'

type Props = {
  onSuccess: () => void
}
export default function useCreateFertilizerView({ onSuccess }: Props): UseCreateFertilizerView {
  const closeModal = useModal((state) => state.closeModal)
  async function handleAddFertilizer(values: FertilizerFormValues): Promise<void> {
    const { error } = await createFertilizerService(values)
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
  handleAddFertilizer: (values: FertilizerFormValues) => Promise<void>
}
