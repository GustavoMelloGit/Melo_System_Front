import { getFertilizersService } from '../../services/get'

const useFertilizerListView = () => {
  const response = getFertilizersService()

  return {
    response,
  }
}
export default useFertilizerListView
