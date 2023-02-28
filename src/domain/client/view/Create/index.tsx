import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import ClientForm from '../../components/ClientForm'
import { type ClientFormValues } from '../../types/components/ClientsForm'
import useCreateClientView from './useView'

export default function CreateClientsView(): JSX.Element {
  const { handleCreateClient } = useCreateClientView()
  return (
    <Page title='Criar Cliente' data-cy='create-client-page'>
      <HeaderBreadcrumbs
        heading='Crie um novo cliente'
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          {
            label: 'Criar Cliente',
          },
        ]}
      />
      <ClientForm
        defaultValues={
          {
            personType: {
              type: 'fisica',
            },
            address: {
              state: 'MG',
            },
          } as ClientFormValues
        }
        onSubmit={handleCreateClient}
        submitText='Criar'
      />
    </Page>
  )
}
