import { toast } from 'react-hot-toast'
import {
    centsToCurrency,
    formatBagsIntoWeight,
} from '../../../../../../../../lib/utils/formatters'
import { calculateCoffeeTotalValue } from '../../../../../../../../lib/utils/math'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { getClientService } from '../../../../../../service'
import { CoffeeAccountEmitter } from '../../events/CoffeeAccountEmitter'
import { buyCoffeeService } from '../../service/post'
import { type BuyCoffeeFormValues } from '../../types'

type Props = {
  clientId: string
}
const useBuyCoffeeView = ({ clientId }: Props): UseBuyCoffeeView => {
  const closeModal = useModal((state) => state.closeModal)
  const { data } = getClientService(clientId)

  async function handleBuyCoffee(formValues: BuyCoffeeFormValues): Promise<void> {
    const { bags, weight, ...values } = formValues
    const totalValue = centsToCurrency(
      calculateCoffeeTotalValue(bags, weight, values.valuePerBag),
    )
    const { error } = await buyCoffeeService({
      weight: formatBagsIntoWeight(bags, weight),
      bebida: values.bebida,
      value: totalValue,
      brook: values.brook,
      complement: values.complement,
      clientId,
      coffeeType: values.coffeeType,
      pricePerBag: values.valuePerBag,
      description: values.description,
    })
    if (error) {
      toast.error('Erro ao comprar café')
      return
    }
    CoffeeAccountEmitter.emit('coffeeBought', formValues)
    toast.success('Café comprado com sucesso')
    closeModal()
  }

  const initialValues: Partial<BuyCoffeeFormValues> = {
    coffeeType: 'bica_corrida',
    bags: 0,
    valuePerBag: 0,
    description: '',
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
  handleBuyCoffee: (values: BuyCoffeeFormValues) => Promise<void>
  closeModal: () => void
  initialValues: Partial<BuyCoffeeFormValues>
}

export default useBuyCoffeeView
