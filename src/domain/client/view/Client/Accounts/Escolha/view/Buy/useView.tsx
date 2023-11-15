import { toast } from 'react-hot-toast'
import { formatBagsIntoWeight } from '../../../../../../../../lib/utils/formatters'
import { calculateCoffeeValuePerWeight } from '../../../../../../../../lib/utils/math'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { getClientService } from '../../../../../../service'
import { EscolhaAccountEmitter } from '../../events/EscolhaAccountEmitter'
import { buyEscolhaService } from '../../service/post'
import { type BuyEscolhaFormValues } from '../../types/esolha'

type Props = {
  clientId: string
}
const useBuyEscolhaView = ({ clientId }: Props): UseBuyCoffeeView => {
  const closeModal = useModal((state) => state.closeModal)
  const { data } = getClientService(clientId)

  async function handleBuyCoffee(formValues: BuyEscolhaFormValues): Promise<void> {
    const { bags, weight, ...values } = formValues
    const totalValue = calculateCoffeeValuePerWeight(+bags, +weight, +values.valuePerWeight)
    const { error } = await buyEscolhaService({
      weight: formatBagsIntoWeight(bags, weight),
      value: totalValue,
      brook: values.brook,
      complement: values.complement,
      clientId,
      coffeeType: 'escolha',
      pricePerWeight: values.valuePerWeight,
      description: values.description,
    })
    if (error) {
      toast.error('Erro ao comprar escolha')
      return
    }
    EscolhaAccountEmitter.emit('escolhaBought', formValues)
    toast.success('Escolha comprada com sucesso')
    closeModal()
  }

  const initialValues: BuyEscolhaFormValues = {
    bags: 0,
    valuePerWeight: 0,
    weight: 0,
    brook: data?.address?.brook ?? '',
    complement: data?.address?.complement ?? '',
    description: '',
  }

  return {
    handleBuyCoffee,
    closeModal,
    initialValues,
  }
}

type UseBuyCoffeeView = {
  handleBuyCoffee: (values: BuyEscolhaFormValues) => Promise<void>
  closeModal: () => void
  initialValues: BuyEscolhaFormValues
}

export default useBuyEscolhaView
