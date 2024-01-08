import { Button, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { shallow } from 'zustand/shallow'
import { useScreenProtectionStore } from '../../../../lib/stores/ScreenProtectionStore'
import { useModal } from '../../../hooks/useModal'
import ControllerField from '../../inputs/ControllerField'
import Modal from '../../Modal'

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Digite sua senha atual'),
  newPassword: yup.string().required('Digite sua nova senha').min(4, 'Senha muito curta'),
})

type ChangePasswordFormValues = {
  newPassword: string
  currentPassword: string
}
export default function SetLockScreenPassword(): JSX.Element {
  const [password, setPassword] = useScreenProtectionStore(
    (state) => [state.password, state.setPassword],
    shallow,
  )
  const closeModal = useModal((state) => state.closeModal)
  const { handleSubmit, control, setError } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      newPassword: '',
      currentPassword: '',
    },
    resolver: yupResolver(validationSchema),
  })

  function handleChangePassword(values: ChangePasswordFormValues): void {
    if (values.currentPassword !== password) {
      setError('currentPassword', {
        type: 'manual',
        message: 'Senha atual incorreta',
      })
      return
    }
    setPassword(values.newPassword)
    closeModal()
  }

  return (
    <Modal isOpen={true} onClose={closeModal} isCentered>
      <Modal.Content>
        <Modal.Header>
          <Heading fontSize='3xl'>Alterar senha</Heading>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleChangePassword)} autoComplete='off'>
            <Stack spacing={2}>
              <ControllerField
                control={control}
                name='currentPassword'
                label='Senha atual'
                placeholder='Senha de bloqueio atual'
                type='password'
                autoComplete='off'
              />
              <ControllerField
                control={control}
                name='newPassword'
                label='Nova senha'
                placeholder='Nova senha de bloqueio'
                type='password'
                autoComplete='off'
              />
            </Stack>
            <Button type='submit' mt={4} w='full' colorScheme='yellow'>
              Salvar
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
