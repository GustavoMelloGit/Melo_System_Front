import { Heading } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import { formatBagsIntoWeight } from '../../../../../../../../lib/utils/formatters'
import Modal from '../../../../../../../../shared/components/Modal'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import CoffeeFormView from '../../components/CreateForm'
import { createCoffeeService } from '../../service/post'
import { type CoffeeFormValues } from '../../types'

type Props = {
  clientId: string
  refetch: () => void
}
export default function CreateCoffeeView({ clientId, refetch }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  async function handleCreateCoffee({
    bags,
    weight,
    date,
    ...values
  }: CoffeeFormValues): Promise<void> {
    const { error } = await createCoffeeService({
      ...values,
      value: formatBagsIntoWeight(bags, weight),
      clientId,
      date: dateInputToApiDate(date),
    })
    if (error) {
      toast.error('Erro ao lançar café')
      return
    }
    toast.success('Café lançado com sucesso')
    closeModal()
    refetch()
  }

  return (
    <Modal isCentered onClose={closeModal} isOpen>
      <Modal.Content maxW={600}>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Lançamento de Café
          </Heading>
        </Modal.Header>
        <Modal.Body w='full'>
          <CoffeeFormView
            onSubmit={handleCreateCoffee}
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              bags: 0,
              details: {
                coffeeType: 'bica_corrida',
                description: '',
              },
              weight: 0,
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
