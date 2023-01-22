import { Routes } from '../../../../lib/routes'
import PageWrapper from '../../../../shared/components/layout/Content/PageWrapper'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import ClientForm from '../../components/ClientForm'

export default function CreateClientsView(): JSX.Element {
  return (
    <PageWrapper>
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
      <ClientForm />
    </PageWrapper>
  )
}
