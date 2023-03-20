import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import { type BookFormValues } from '../../../types/model/book'
import useBookForm from './useBookForm'

type Props = {
  initialValues?: BookFormValues
  onSubmit: (values: BookFormValues) => Promise<void>
}
export default function BookForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { form, closeModal } = useBookForm({ initialValues })
  const { handleSubmit, formState, reset } = form

  useEffect(() => {
    if (initialValues) {
      reset(initialValues) // Need to reset the form when initialValues change
    }
  }, [initialValues, reset])

  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Criar talão
          </Heading>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <RHFField<BookFormValues>
                name='number'
                register={form.register}
                label='Número do talão'
                placeholder='Ex.: 12'
                type='number'
                inputMode='numeric'
                errors={formState.errors}
              />
              <Button type='submit' isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
