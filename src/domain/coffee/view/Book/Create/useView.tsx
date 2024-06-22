import { toast } from 'react-hot-toast'
import { PaginationParams } from '../../../../../lib/constants/pagination'
import { useModal } from '../../../../../shared/hooks/useModal'
import { BookService } from '../../../services/Book/BookService'
import { useGetBooksService } from '../../../services/Book/BookService.hooks'
import { type BookFormValues } from '../../../types/model/book'

type Props = {
  refetch: () => void
}
export default function useCreateBookView({ refetch }: Props): UseCreateBookView {
  const closeModal = useModal((state) => state.closeModal)
  const params = new URLSearchParams({
    [PaginationParams.sortOrder]: 'desc',
    [PaginationParams.rowsPerPage]: '1',
    [PaginationParams.sortBy]: 'number',
  }).toString()
  const { data } = useGetBooksService(params)

  async function handleCreateBook(values: BookFormValues): Promise<void> {
    const { error } = await BookService.createBook(values)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Talão criado com sucesso!')
    closeModal()
    refetch()
  }

  return {
    handleCreateBook,
    lastBookNumber: data?.data?.[0]?.number ?? 0,
  }
}

type UseCreateBookView = {
  handleCreateBook: (values: BookFormValues) => Promise<void>
  lastBookNumber: number
}
