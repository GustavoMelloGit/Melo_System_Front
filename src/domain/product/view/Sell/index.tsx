import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { ClientAccountsEnum } from '../../../client/view/Client/Details'
import SellProductForm from '../../components/Sell/Form'
import { EmptyProduct } from '../../components/Sell/Form/types'
import useSellProductView from './useView'

const SellProduct = (): JSX.Element => {
  const { handleSellFertilizer, client } = useSellProductView()

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
                  to: `${Routes.clientPage(client)}?tab=${ClientAccountsEnum.fertilizer}`,
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
          products: [EmptyProduct],
        }}
      />
    </Page>
  )
}
export default SellProduct
