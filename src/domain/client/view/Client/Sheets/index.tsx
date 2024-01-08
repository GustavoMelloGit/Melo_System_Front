import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import ClientSheetsTable from '../../../components/Client/Sheets'
import useClientSheetsPage from './useView'

export default function ClientSheetsView(): JSX.Element {
  const { sheets, client, clientId, isLoading } = useClientSheetsPage()
  return (
    <Page title='Pesagens do cliente'>
      <HeaderBreadcrumbs
        heading={`Folhas`}
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
      <ClientSheetsTable
        data={sheets?.data}
        totalLength={sheets?.total ?? 0}
        isLoading={isLoading}
      />
    </Page>
  )
}
