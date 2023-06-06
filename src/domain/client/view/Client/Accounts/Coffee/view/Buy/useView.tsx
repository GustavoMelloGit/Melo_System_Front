import { toast } from 'react-hot-toast'
import GlobalConfig from '../../../../../../../../lib/constants/config'
import { calculateCoffeeTotalValue } from '../../../../../../../../lib/utils/math'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { getClientService } from '../../../../../../service'
import { buyCoffeeService } from '../../service/post'
import { type BuyCoffeeFormValues } from '../../types'

type Props = {
  clientId: string
  refetch: () => void
}
const useBuyCoffeeView = ({ clientId, refetch }: Props): UseBuyCoffeeView => {
  const closeModal = useModal((state) => state.closeModal)
  const { data } = getClientService(clientId)

  async function handleBuyCoffee({ bags, weight, ...values }: BuyCoffeeFormValues): Promise<void> {
    const totalValue = calculateCoffeeTotalValue(bags, weight, values.valuePerBag)
    const { error } = await buyCoffeeService({
      weight: bags * GlobalConfig.weightPerBag + weight,
      bebida: values.bebida,
      value: totalValue,
      brook: values.brook.trim().length > 0 ? values.brook : undefined,
      complement: values.complement.trim().length > 0 ? values.complement : undefined,
      clientId,
      coffeeType: values.coffeeType,
    })
    if (error) {
      toast.error('Erro ao comprar café')
      return
    }
    refetch()
    toast.success('Café comprado com sucesso')
    closeModal()
  }

  const initialValues: BuyCoffeeFormValues = {
    coffeeType: 'bica_corrida',
    bags: 0,
    bebida: 'duro',
    valuePerBag: 0,
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
  initialValues: BuyCoffeeFormValues
}

export default useBuyCoffeeView
