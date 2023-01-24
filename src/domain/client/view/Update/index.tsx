import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import ClientForm from '../../components/ClientForm'
import useUpdateClientView from './useView'

export default function UpdateClientView(): JSX.Element {
  const { handleUpdateClient } = useUpdateClientView()
  return (
    <Page title='Atualizar Cliente'>
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
      <ClientForm
        onSubmit={handleUpdateClient}
        defaultValues={{
          address: {
            brook: '',
            city: '',
            complement: '',
            neighborhood: '',
            number: 0,
            state: '',
            street: '',
            zipCode: '',
          },
          contact: {
            fatherName: '',
            motherName: '',
            phone: '',
          },
          profileImage: ' ',
          id: '',
          name: '',
        }}
        submitText='Salvar'
      />
    </Page>
  )
}
