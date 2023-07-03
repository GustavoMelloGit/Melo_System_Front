import { toast } from 'react-hot-toast'
import { calculateCoffeeValuePerWeight } from '../../../../../../../../lib/utils/math'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { getClientService } from '../../../../../../service'
import { type BuyEscolhaFormValues } from '../../types/esolha'

type Props = {
  clientId: string
  refetch: () => void
}
const useBuyEscolhaView = ({ clientId, refetch }: Props): UseBuyCoffeeView => {
  const closeModal = useModal((state) => state.closeModal)
  const { data } = getClientService(clientId)

  async function handleBuyCoffee({ bags, weight, ...values }: BuyEscolhaFormValues): Promise<void> {
    const totalValue = calculateCoffeeValuePerWeight(bags, weight, values.valuePerWeight)
    console.log(totalValue, values)
    // const { error } = await buyCoffeeService({
    //   weight: formatBagsIntoWeight(bags, weight),
    //   bebida: values.bebida,
    //   value: totalValue,
    //   brook: values.brook.trim().length > 0 ? values.brook : undefined,
    //   complement: values.complement.trim().length > 0 ? values.complement : undefined,
    //   clientId,
    //   coffeeType: values.coffeeType,
    //   pricePerBag: values.valuePerBag,
    // })
    // if (error) {
    //   toast.error('Erro ao comprar café')
    //   return
    // }
    refetch()
    toast.success('Café comprado com sucesso')
    closeModal()
  }

  const initialValues: BuyEscolhaFormValues = {
    bags: 0,
    valuePerWeight: 0,
    weight: 0,
    brook: data?.address?.brook ?? '',
    complement: data?.address?.complement ?? '',
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
