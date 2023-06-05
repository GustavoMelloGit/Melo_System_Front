import { toast } from 'react-hot-toast'
import GlobalConfig from '../../../../../../../../lib/constants/config'
import { formatAddress } from '../../../../../../../../lib/utils/formatters'
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
      address: values.address.trim().length > 0 ? values.address : undefined,
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
    address: formatAddress(data?.address ?? {}),
    coffeeType: 'bica_corrida',
    bags: 0,
    bebida: 'duro',
    valuePerBag: 0,
    weight: 0,
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
