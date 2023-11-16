import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getFertilizersService } from '../../../../fertilizer/services/get'

export default function useStockListView(): UseStockListView {
  const params = useServiceParams()
  const response = getFertilizersService(params)
  const openModal = useModal((state) => state.openModal)

  async function handleAddFertilizer(): Promise<void> {
    const CreateFertilizerView = (await import('../Create')).default
    openModal(<CreateFertilizerView refetch={response.mutate} />)
  }

  return {
    response,
    handleAddFertilizer,
  }
}

type UseStockListView = {
  response: ReturnType<typeof getFertilizersService>
  handleAddFertilizer: () => Promise<void>
}
