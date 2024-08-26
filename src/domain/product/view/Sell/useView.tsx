import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { useGetClientService } from '../../../client/service'
import { sellFertilizerService } from '../../../client/view/Client/Accounts/Product/services/post'
import {
  type ProductFormValues,
  type SellProductFormValues,
} from '../../components/Sell/Form/types'

const useSellProductView = (): UseSellFertilizerView => {
  const { allSearchParams } = useURLSearchParams()
  const { client } = allSearchParams
  const navigate = useNavigate()
  const { data } = useGetClientService(client)

  async function handleSellFertilizer(values: SellProductFormValues): Promise<void> {
    if (!client) return
    const formattedProducts = values.products.map((product) => ({
      bags: product.quantity,
      fertilizerId: product.productId,
      pricePerBag: product.price,
      brook: product.brook,
      complement: product.complement,
      deliveryDate: product.deliveryDate,
    }))
    const { error } = await sellFertilizerService({
      clientId: client,
      products: formattedProducts,
    })
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Produtos vendidos com sucesso!')
    navigate(Routes.clientPage(client))
  }

  const emptyProduct: ProductFormValues = {
    deliveryDate: new Date().toISOString().split('T')[0],
    productId: '',
    productName: '',
    price: 0,
    quantity: 1,
    shouldDeliver: false,
    brook: data?.address.brook ?? '',
    complement: data?.address.complement ?? '',
    description: '',
  }

  return {
    handleSellFertilizer,
    client,
    emptyProduct,
  }
}
type UseSellFertilizerView = {
  handleSellFertilizer: (values: SellProductFormValues) => Promise<void>
  client: string | undefined
  emptyProduct: ProductFormValues
}

export default useSellProductView
