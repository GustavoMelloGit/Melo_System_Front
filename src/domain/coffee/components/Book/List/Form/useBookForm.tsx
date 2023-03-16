import { useForm, type UseFormReturn } from 'react-hook-form'
import { useModal } from '../../../../../../shared/hooks/useModal'
import { type BookFormValues } from '../../../../types/model/book'

type Props = {
  initialValues?: BookFormValues
}
export default function useBookForm({ initialValues }: Props): UseBookForm {
  const form = useForm<BookFormValues>({
    defaultValues: initialValues,
  })
  const closeModal = useModal((state) => state.closeModal)

  return {
    form,
    closeModal,
  }
}
type UseBookForm = {
  form: UseFormReturn<BookFormValues>
  closeModal: () => void
}
