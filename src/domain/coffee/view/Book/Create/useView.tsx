import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { createBookService } from '../../../services/Book/post'
import { type BookFormValues } from '../../../types/model/book'

type Props = {
  refetch: () => void
}
export default function useCreateBookView({ refetch }: Props): UseCreateBookView {
  const closeModal = useModal((state) => state.closeModal)

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
  }
}

type UseCreateBookView = {
  handleCreateBook: (values: BookFormValues) => Promise<void>
}
