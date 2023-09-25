import { Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import NumberInput from '../../../../../shared/components/inputs/NumberInput'
import Modal from '../../../../../shared/components/Modal'
import { type CreditFertilizerFormValues } from './types'

type Props = {
  closeModal: () => void
  onSubmit: (values: CreditFertilizerFormValues) => void
  initialValues: CreditFertilizerFormValues
}
export default function CreditFertilizerView({
  closeModal,
  onSubmit,
  initialValues,
}: Props): JSX.Element {
  const subheaderColor = useColorModeValue('gray.500', 'gray.400')
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<CreditFertilizerFormValues>({
    defaultValues: initialValues,
  })
  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Stack>
            <Heading as='h1' fontSize='3xl'>
              Definir quantidade
            </Heading>
            <Heading as='h2' fontSize='sm' color={subheaderColor} fontWeight={500}>
              O valor definido{' '}
              <Text as='strong' color='white'>
                substituirá
              </Text>{' '}
              o valor atual
            </Heading>
          </Stack>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Controller
                control={control}
                name='quantity'
                render={({ field }) => <NumberInput {...field} />}
              />
              <Button type='submit' w='full' isLoading={isSubmitting} colorScheme='blue'>
                Salvar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
