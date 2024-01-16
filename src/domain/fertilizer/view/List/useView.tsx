import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { useGetFertilizersService } from '../../services/get'

export default function useFertilizerListView(): UseFertilizerListView {
  const params = useServiceParams()
  const response = useGetFertilizersService(params)
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
  response: ReturnType<typeof useGetFertilizersService>
  handleAddFertilizer: () => Promise<void>
}
