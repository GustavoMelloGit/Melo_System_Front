import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { ClientAccountsEnum } from '../../../client/view/Client/Details'
import SellProductForm from '../../components/Sell/Form'
import useSellProductView from './useView'

const SellProduct = (): JSX.Element => {
  const { handleSellFertilizer, client, emptyProduct } = useSellProductView()

  return (
    <Page title='Vender Produto'>
      <HeaderBreadcrumbs
        heading={'Vender Produto'}
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          ...(client
            ? [
                {
                  label: 'Cliente',
                  to: `${Routes.clientPage(client)}?tab=${ClientAccountsEnum.products}`,
                },
              ]
            : []),
          {
            label: 'Vender Produtos',
          },
        ]}
      />
      <SellProductForm
        onSubmit={handleSellFertilizer}
        initialValues={{
          products: [emptyProduct],
        }}
        emptyProduct={emptyProduct}
      />
    </Page>
  )
}
export default SellProduct
