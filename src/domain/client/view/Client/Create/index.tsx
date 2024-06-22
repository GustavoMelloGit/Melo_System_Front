import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import ClientForm from '../../../components/Client/Form'
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
        defaultValues={{
          address: {
            brook: '',
            city: '',
            complement: '',
            neighborhood: '',
            number: '',
            state: '',
            street: '',
            zipCode: '',
          },
          description: '',
          nickname: '',
          contact: {
            phone: '',
          },
          personType: {
            type: 'fisica',
            birthDate: '',
            cpf: '',
            rg: '',
            fatherName: '',
            motherName: '',
            producerRegistration: '',
            rgEmissionDate: '',
          },
          profileImage: '',
          name: '',
        }}
        onSubmit={handleCreateClient}
        submitText='Criar'
      />
    </Page>
  )
}
