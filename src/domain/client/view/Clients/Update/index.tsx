import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SpinLoader from '../../../../../shared/components/SpinLoader'
import ClientForm from '../../../components/ClientForm'
import useUpdateClientView from './useView'

export default function UpdateClientView(): JSX.Element {
  const { handleUpdateClient, initialValues, isLoading } = useUpdateClientView()
  return (
    <Page title='Atualizar Cliente' data-cy='update-client-page'>
      <HeaderBreadcrumbs
        heading='Atualize o cliente'
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          {
            label: 'Atualizar Cliente',
          },
        ]}
      />
      {isLoading ? (
        <SpinLoader />
      ) : (
        <ClientForm
          onSubmit={handleUpdateClient}
          defaultValues={initialValues}
          submitText='Salvar'
        />
      )}
    </Page>
  )
}
