import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { IoWarning } from 'react-icons/io5'
import { useModal } from '../hooks/useModal'
import Modal from './Modal'

type Props = {
  onResolve: (response: boolean) => void
}
export default function ConfirmDialog({ onResolve }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  function handleOnResolve(response: boolean): void {
    onResolve(response)
    closeModal()
  }
  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <Modal.Content rounded={10}>
        <Modal.CloseButton />
        <Modal.Header pt={8}>
          <Heading as='h1' fontSize='3xl'>
            Deseja confirmar a ação?
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Box
            bg='red.200'
            borderLeftWidth={4}
            borderLeftColor='red.700'
            rounded={5}
            px={5}
            py={2}
            color='red.900'
            mt={1}
          >
            <Flex align='center' gap={2}>
              <IoWarning size={22} />
              <Text fontSize='lg' fontWeight={700}>
                ATENÇÃO!
              </Text>
            </Flex>
            <Heading as='h2' fontSize='md' fontWeight={500}>
              Essa ação não poderá ser desfeita!
            </Heading>
          </Box>
          <Flex justify='space-between' align='center' mt={5} gap={4}>
            <Button
              onClick={() => {
                handleOnResolve(false)
              }}
              flex={1}
              colorScheme='green'
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleOnResolve(true)
              }}
              flex={1}
              colorScheme='red'
            >
              Confirmar
            </Button>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
