import { Button, Heading, Select, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import zxcvbn from 'zxcvbn'
import { validationErrors } from '../../../../../lib/errors'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import Modal from '../../../../../shared/components/Modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type AddUserFormValues } from './types'

const validationSchema = yup.object().shape<Record<keyof AddUserFormValues, any>>({
  name: yup.string().required(validationErrors.nameIsRequired),
  nickname: yup.string().required(validationErrors.nicknameIsRequired),
  password: yup
    .string()
    .required(validationErrors.passwordIsRequired)
    .test('is-strong', validationErrors.passwordIsNotStrongEnougth, (value) =>
      value ? zxcvbn(value).score >= 4 : false,
    ),
  role: yup.string().required(validationErrors.roleIsRequired),
})

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
    resolver: yupResolver(validationSchema),
  })

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Adicionar usuário
          </Heading>
        </Modal.Header>
        <Modal.Body>
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
                required
              />
              <ControllerField
                control={control}
                name='nickname'
                label='Login'
                placeholder='Ex.: Gustavo'
                required
              />
              <ControllerField
                control={control}
                name='password'
                label='Senha'
                placeholder='Utilize uma senha forte'
                required
              />
              <ControllerField
                control={control}
                name='role'
                label='Permissão'
                required
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
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
