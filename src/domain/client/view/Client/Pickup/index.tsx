import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import usePickupTableView from '../../../../coffee/components/Pickup/Table/useView'
import PickupTableView from '../../../../coffee/components/Pickup/Table/View'
import useClientPickupView from './useView'

export default function ClientPickupView(): JSX.Element {
  const { client, pickupData, isLoading, clientId } = useClientPickupView()
  const { onClickCheck, onClickUncheck, onClickUpdate } = usePickupTableView()

  return (
    <Page title='Pesagens do cliente'>
      <HeaderBreadcrumbs
        heading={`Cafés a buscar`}
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
      <PickupTableView
        data={pickupData?.data}
        isLoading={isLoading}
        totalPickups={pickupData?.total ?? 0}
        onClickCheck={onClickCheck}
        onClickUncheck={onClickUncheck}
        onClickUpdate={onClickUpdate}
      />
    </Page>
  )
}
