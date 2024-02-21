import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../../../../../shared/components/Modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import { UserEmitter } from '../../../events/UserEmitter'
import { deleteUserService } from '../../../services/deleteUserService'

type Props = {
  id: string
}
export default function DeleteUserView({ id }: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = useModal((state) => state.closeModal)

  async function handleDeleteUser(): Promise<void> {
    setIsLoading(true)
    const { error } = await deleteUserService(id)
    setIsLoading(false)
    if (error) {
      toast.error('Erro ao apagar usuário')
      return
    }
    UserEmitter.emit('userDeleted', id)
    toast.success('Usuário apagado com sucesso')
    closeModal()
  }

  return (
    <Modal isOpen onClose={closeModal}>
      <Modal.Content>
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Apagar usuário
          </Heading>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>Você tem certeza que deseja apagar o usuário?</Text>
          <Flex gap={3} mt={3}>
            <Button isLoading={isLoading} onClick={handleDeleteUser} flex={1} colorScheme='red'>
              Apagar
            </Button>
            <Button flex={1} onClick={closeModal} colorScheme='blue'>
              Cancelar
            </Button>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
