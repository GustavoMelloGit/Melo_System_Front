import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getBooksService } from '../../../services/Book/get'
import { type BookModel } from '../../../types/model/book'

export default function useCoffeeBookView(): UseCoffeeBookView {
  const params = useServiceParams()
  const { data, isLoading, error, total, mutate } = getBooksService(params)
  const openModal = useModal((state) => state.openModal)

  async function openCreateBookModal(): Promise<void> {
    const CreateBookView = (await import('../Create')).default
    openModal(<CreateBookView refetch={() => mutate?.()} />)
  }

  return {
    data,
    isLoading,
    error,
    total: total ?? 0,
    openCreateBookModal,
  }
}

type UseCoffeeBookView = {
  data?: BookModel[]
  isLoading: boolean
  error?: string
  total: number
  openCreateBookModal: () => Promise<void>
}
