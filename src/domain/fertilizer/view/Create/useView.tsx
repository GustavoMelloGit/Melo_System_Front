import { toast } from 'react-hot-toast'
import { useModal } from '../../../../shared/hooks/useModal'
import { FertilizerService } from '../../services'
import { type FertilizerFormValues } from '../../types/model/Fertilizer'

type Props = {
  onSuccess: () => void
}
export default function useCreateFertilizerView({ onSuccess }: Props): UseCreateFertilizerView {
  const closeModal = useModal((state) => state.closeModal)
  async function handleAddFertilizer(values: FertilizerFormValues): Promise<void> {
    const { error } = await FertilizerService.create(values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Adubo criado com sucesso')
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
