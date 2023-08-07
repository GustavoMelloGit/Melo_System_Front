import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import PickupTable from '../../../components/Client/Pickup/Table'
import useClientPickupView from './useView'

export default function ClientPickupView(): JSX.Element {
  const { client, pickupData, isLoading, clientId } = useClientPickupView()
  return (
    <Page title='Pesagens do cliente'>
      <HeaderBreadcrumbs
        heading={`Folhas - ${client?.name ?? 'Cliente'}`}
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          {
            label: client?.name ?? clientId,
            to: Routes.clientPage(clientId),
          },
          {
            label: 'Pesagens',
          },
        ]}
      />
      <PickupTable
        data={pickupData?.data}
        isLoading={isLoading}
        totalPickups={pickupData?.total ?? 0}
      />
    </Page>
  )
}
