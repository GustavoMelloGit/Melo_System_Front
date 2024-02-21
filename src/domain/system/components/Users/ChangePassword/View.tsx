import { Button, Heading } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import zxcvbn from 'zxcvbn'
import { validationErrors } from '../../../../../lib/errors'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import Modal from '../../../../../shared/components/Modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import { changePasswordService } from '../../../services/changePasswordServoce'

type ChangePasswordFormValues = {
  password: string
}

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(validationErrors.passwordIsRequired)
    .test('is-strong', validationErrors.passwordIsNotStrongEnougth, (value) =>
      value ? zxcvbn(value).score >= 4 : false,
    ),
})

type Props = {
  id: string
}

export default function ChangePasswordView({ id }: Props): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(validationSchema),
  })
  const closeModal = useModal((state) => state.closeModal)

  async function onSubmit(values: ChangePasswordFormValues): Promise<void> {
    const { error } = await changePasswordService({ id, password: values.password })
    if (error) {
      toast.error('Erro ao atualizar senha')
    }
    toast.success('Senha atualizada com sucesso')
    closeModal()
  }

  return (
    <Modal onClose={closeModal} isOpen>
      <Modal.Content>
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Atualizar senha
          </Heading>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControllerField
              control={control}
              name='password'
              label='Nova senha'
              type='text'
              placeholder='Digite a nova senha'
            />
            <Button type='submit' colorScheme='blue' isLoading={isSubmitting} mt={4} w='100%'>
              Atualizar
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
