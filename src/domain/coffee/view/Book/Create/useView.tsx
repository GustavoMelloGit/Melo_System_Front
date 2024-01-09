import { toast } from 'react-hot-toast'
import { PaginationParams } from '../../../../../lib/constants/pagination'
import { useModal } from '../../../../../shared/hooks/useModal'
import { useGetBooksService } from '../../../services/Book/get'
import { createBookService } from '../../../services/Book/post'
import { type BookFormValues } from '../../../types/model/book'

type Props = {
  refetch: () => void
}
export default function useCreateBookView({ refetch }: Props): UseCreateBookView {
  const closeModal = useModal((state) => state.closeModal)
  const { data } = useGetBooksService(
    `${PaginationParams.sortBy}=number&${PaginationParams.sortOrder}=desc&${PaginationParams.rowsPerPage}=1`,
  )

  async function handleCreateBook(values: BookFormValues): Promise<void> {
    const { error } = await createBookService(values)
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
