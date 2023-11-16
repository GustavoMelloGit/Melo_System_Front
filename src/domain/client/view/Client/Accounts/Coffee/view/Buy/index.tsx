import { Heading } from '@chakra-ui/react'
import Modal from '../../../../../../../../shared/components/Modal'
import BuyCoffeeFormView from '../../components/BuyForm'
import useBuyCoffeeView from './useView'

type Props = {
  clientId: string
}
const BuyCoffeeView = ({ clientId }: Props): JSX.Element => {
  const { closeModal, handleBuyCoffee, initialValues } = useBuyCoffeeView({ clientId })
  return (
    <Modal isOpen onClose={closeModal}>
      <Modal.Content maxW={600}>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Comprar café
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <BuyCoffeeFormView onSubmit={handleBuyCoffee} initialValues={initialValues} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default BuyCoffeeView
