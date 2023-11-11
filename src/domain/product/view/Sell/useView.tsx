import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { sellFertilizerService } from '../../../client/view/Client/Accounts/Product/services/post'
import { type SellProductFormValues } from '../../components/Sell/Form/types'

const useSellProductView = (): UseSellFertilizerView => {
  const { allSearchParams } = useURLSearchParams()
  const { client } = allSearchParams
  const navigate = useNavigate()

  async function handleSellFertilizer(values: SellProductFormValues): Promise<void> {
    if (!client) return
    try {
      await Promise.all(
        values.products.map(async (product) =>
          sellFertilizerService({
            clientId: client,
            bags: product.quantity,
            fertilizerId: product.productId,
            pricePerBag: product.price,
            brook: product.brook,
            complement: product.complement,
            deliveryDate: product.deliveryDate,
          }),
        ),
      )
      toast.success('Produtos vendidos com sucesso!')
      navigate(Routes.clientPage(client))
    } catch (error) {
      toast.error(
        'Ocorreu um erro na venda dos produtos. Verifique na conta do cliente quais produtos foram vendidos com sucesso.',
      )
    }
  }

  return {
    handleSellFertilizer,
    client,
  }
}
type UseSellFertilizerView = {
  handleSellFertilizer: (values: SellProductFormValues) => Promise<void>
  client: string | undefined
}

export default useSellProductView
