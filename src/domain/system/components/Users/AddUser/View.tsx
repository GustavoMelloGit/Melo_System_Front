import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type AddUserFormValues } from './types'

const defaultValues: AddUserFormValues = {
  name: '',
  nickname: '',
  password: '',
  role: 'user',
}
type Props = {
  onSubmit: (values: AddUserFormValues) => Promise<void>
}
export default function AddUserView({ onSubmit }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<AddUserFormValues>({
    defaultValues,
  })

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Adicionar usuário
          </Heading>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(async (values) => {
              await onSubmit(values)
              reset(defaultValues)
            })}
          >
            <Stack>
              <ControllerField
                control={control}
                name='name'
                label='Nome'
                placeholder='Ex.: Gustavo Mello'
              />
              <ControllerField
                control={control}
                name='nickname'
                label='Login'
                placeholder='Ex.: Gustavo'
              />
              <ControllerField
                control={control}
                name='password'
                label='Senha'
                placeholder='Utilize uma senha forte'
              />
              <ControllerField
                control={control}
                name='role'
                label='Permissão'
                CustomInput={
                  <Select>
                    <option value='user'>Usuário</option>
                    <option value='admin'>Admin</option>
                  </Select>
                }
              />
            </Stack>
            <Button mt={4} w='full' isLoading={isSubmitting} type='submit' colorScheme='blue'>
              Adicionar
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
