import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getBooksService } from '../../../services/Pickup/get'
import { type BookModel } from '../../../types/model/book'

export default function useCoffeeBookView(): UseCoffeeBookView {
  const params = useServiceParams()
  const { data, isLoading, error, total } = getBooksService(params)

  return {
    data,
    isLoading,
    error,
    total: total ?? 0,
  }
}

type UseCoffeeBookView = {
  data?: BookModel[]
  isLoading: boolean
  error?: string
  total: number
}
