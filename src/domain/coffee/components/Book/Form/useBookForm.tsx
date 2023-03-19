import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type BookFormValues } from '../../../types/model/book'

type Props = {
  initialValues?: BookFormValues
}
export default function useBookForm({ initialValues }: Props): UseBookForm {
  const form = useForm<BookFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const closeModal = useModal((state) => state.closeModal)

  return {
    form,
    closeModal,
  }
}

const validationSchema = yup.object().shape({
  number: yup
    .number()
    .typeError(validationErrors.bookNumberIsInvalid)
    .required(validationErrors.bookNumberIsInvalid)
    .test({
      name: 'number',
      message: validationErrors.bookNumberIsInvalid,
      test: (value) => Number.isSafeInteger(value),
    }),
})

type UseBookForm = {
  form: UseFormReturn<BookFormValues>
  closeModal: () => void
}
