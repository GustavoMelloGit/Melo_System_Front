import { Button, Heading, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import Modal from '../../../../../shared/components/Modal'
import { type BookFormValues } from '../../../types/model/book'
import useBookForm from './useBookForm'

type Props = {
  initialValues?: BookFormValues
  onSubmit: (values: BookFormValues) => Promise<void>
}
export default function BookForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { form, closeModal } = useBookForm({ initialValues })
  const { handleSubmit, formState, reset, control } = form

  useEffect(() => {
    if (initialValues) {
      reset(initialValues) // Need to reset the form when initialValues change
    }
  }, [initialValues, reset])

  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <Modal.Content>
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Criar talão
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <ControllerField<BookFormValues>
                control={control}
                name='number'
                label='Número do talão'
                placeholder='Ex.: 12'
                type='number'
                inputMode='numeric'
                required
              />
              <Button type='submit' isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
