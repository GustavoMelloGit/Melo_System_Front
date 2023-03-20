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
import RHFField from '../../../../../shared/components/inputs/RHFField'
import { type BookFormValues } from '../../../types/model/book'
import useBookForm from './useBookForm'

type Props = {
  initialValues?: BookFormValues
  onSubmit: (values: BookFormValues) => Promise<void>
}
export default function BookForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { form, closeModal } = useBookForm({ initialValues })
  const { handleSubmit, formState } = form
  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Criar talão
          </Heading>
        </ModalHeader>
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <RHFField<BookFormValues>
                label='Número do talão'
                placeholder='Ex: 1'
                name='number'
                register={form.register}
                type='number'
                inputMode='numeric'
                errors={formState.errors}
              />
              <Button w='full' type='submit'>
                Salvar
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
