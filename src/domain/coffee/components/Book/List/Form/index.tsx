import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { type BookFormValues } from '../../../../types/model/book'
import useBookForm from './useBookForm'

type Props = {
  initialValues?: BookFormValues
  onSubmit: (values: BookFormValues) => Promise<void>
}
export default function BookForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { form, closeModal } = useBookForm({ initialValues })
  const { handleSubmit } = form
  return (
    <Modal isOpen onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Hello World</p>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
