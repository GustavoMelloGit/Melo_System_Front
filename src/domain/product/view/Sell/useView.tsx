import { useModal } from '../../../../shared/hooks/useModal'
import { type SellProductFormValues } from '../../components/Sell/Form/types'

const useSellProductView = (): UseSellFertilizerView => {
  const closeModal = useModal((state) => state.closeModal)

  async function handleSellFertilizer(values: SellProductFormValues): Promise<void> {
    console.log(values)
    // const { client, products } = values
    // const { error } = await sellFertilizerService({
    //   clientId,
    //   ...formValues,
    // })
    // if (error) {
    //   toast.error(error)
    //   return
    // }
    // toast.success('Fertilizante vendido com sucesso')
    // closeModal()
  }

  return {
    closeModal,
    handleSellFertilizer,
  }
}
type UseSellFertilizerView = {
  closeModal: () => void
  handleSellFertilizer: (values: SellProductFormValues) => Promise<void>
}

export default useSellProductView
