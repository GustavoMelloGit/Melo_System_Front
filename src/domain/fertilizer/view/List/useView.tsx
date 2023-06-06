import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { getFertilizersService } from '../../services/get'

export default function useFertilizerListView(): UseFertilizerListView {
  const params = useServiceParams()
  const response = getFertilizersService(params)
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
