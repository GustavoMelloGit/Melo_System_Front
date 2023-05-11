import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { getDefaultSortParams } from '../../../../../lib/utils/utils'
import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { getBooksService } from '../../../services/Book/get'
import { type BookModel } from '../../../types/model/book'

export default function useCoffeeBookView(): UseCoffeeBookView {
  const navigate = useNavigate()
  const { allSearchParams } = useURLSearchParams()
  const params = useServiceParams()
  const { data, isLoading, error, total, mutate } = getBooksService(
    params || getDefaultSortParams('number'),
  )
  const openModal = useModal((state) => state.openModal)

  async function openCreateBookModal(): Promise<void> {
    const CreateBookView = (await import('../Create')).default
    openModal(<CreateBookView refetch={mutate} />)
  }

  useEffect(() => {
    const latest = allSearchParams.latest
    if (latest === 'true' && data?.length) {
      const latestBook = data[0]
      navigate(Routes.bookPage(latestBook.number))
    }
  }, [allSearchParams, data])

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
