import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import SellProductForm from '../../components/Sell/Form'
import { EmptyProduct } from '../../components/Sell/Form/types'
import useSellProductView from './useView'

const SellProduct = (): JSX.Element => {
  const { handleSellFertilizer } = useSellProductView()

  return (
    <Page title='Vender Produto'>
      <HeaderBreadcrumbs
        heading={'Vender Produto'}
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          {
            label: 'Vender Produtos',
          },
        ]}
      />
      <SellProductForm
        onSubmit={handleSellFertilizer}
        initialValues={{
          client: '',
          products: [EmptyProduct],
        }}
      />
    </Page>
  )
}
export default SellProduct
