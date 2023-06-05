import { useModal } from '../../../../shared/hooks/useModal'
import { getFertilizersService } from '../../services/get'

export default function useFertilizerListView(): UseFertilizerListView {
  const response = getFertilizersService()
  const openModal = useModal((state) => state.openModal)

  async function handleAddFertilizer(): Promise<void> {
    const CreateFertilizerView = (await import('../../view/Create')).default
    openModal(<CreateFertilizerView refetch={response.mutate} />)
  }

  return {
    response,
    handleAddFertilizer,
  }
}

type UseFertilizerListView = {
  response: ReturnType<typeof getFertilizersService>
  handleAddFertilizer: () => Promise<void>
}
