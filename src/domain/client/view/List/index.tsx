import { IconButton } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import ClientsTable from '../../components/ClientsTable'
import useClientsListView from './useView'

export default function ClientsListView(): JSX.Element {
  const { data, isLoading, total } = useClientsListView()
  return (
    <Page title='Clientes' data-cy='list-clients-page'>
      <HeaderBreadcrumbs
        heading='Clientes'
        links={[
          {
            label: 'Lista de clientes',
          },
        ]}
        actions={
          <Link to={Routes.createClient}>
            <IconButton
              as='span'
              aria-label='Criar cliente'
              icon={<IoAddOutline size={22} />}
              colorScheme='blue'
              variant='outline'
              data-cy='create-client-button'
            />
          </Link>
        }
      />
      <ClientsTable totalClients={total} data={data} isLoading={isLoading} />
    </Page>
  )
}
