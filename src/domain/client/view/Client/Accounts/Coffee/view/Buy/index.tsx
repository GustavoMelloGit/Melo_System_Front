import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import GlobalConfig from '../../../../../../../../lib/constants/config'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import BuyCoffeeFormView from '../../components/BuyForm'
import { buyCoffeeService } from '../../service/post'
import { type BuyCoffeeFormValues } from '../../types'

type Props = {
  clientId: string
}
const BuyCoffeeView = ({ clientId }: Props): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)

  async function handleBuyCoffee({ bags, weight, ...values }: BuyCoffeeFormValues): Promise<void> {
    const valueOnWeight = Number(
      ((weight * values.valuePerBag) / GlobalConfig.weightPerBag).toFixed(2),
    )
    const valueOnBags = bags * values.valuePerBag
    const totalValue = valueOnWeight + valueOnBags
    const { error } = await buyCoffeeService({
      weight: bags * GlobalConfig.weightPerBag + weight,
      bebida: values.bebida,
      value: totalValue,
      address: values.address.trim().length > 0 ? values.address : undefined,
      clientId,
      coffeeType: values.coffeeType,
    })
    if (error) {
      toast.error('Erro ao comprar café')
      return
    }
    toast.success('Café comprado com sucesso')
    closeModal()
  }

  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Comprar café
          </Heading>
        </ModalHeader>
        <ModalBody>
          <BuyCoffeeFormView
            onSubmit={handleBuyCoffee}
            initialValues={{
              address: '',
              coffeeType: 'bica_corrida',
              bags: 0,
              bebida: 'duro',
              shouldSetOrder: false,
              valuePerBag: 0,
              weight: 0,
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default BuyCoffeeView
