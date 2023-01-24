import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Page from '../../../../shared/components/Page'
import ClientsTable from '../../components/ClientsTable'
import useClientsListView from './useView'

export default function ClientsListView(): JSX.Element {
  const {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    changeRowsPerPage,
    handleCreateClient,
    handleUpdateClient,
  } = useClientsListView()
  return (
    <Page title='Clientes'>
      <Flex as='header' justify='space-between'>
        <Heading>Clientes</Heading>
        <IconButton
          onClick={handleCreateClient}
          aria-label='Criar cliente'
          icon={<AiOutlineUserAdd />}
          colorScheme='blue'
          variant='outline'
        />
      </Flex>
      <ClientsTable
        data={data}
        onNextPage={fetchNextPage}
        onPreviousPage={fetchPreviousPage}
        onChangeRowsPerPage={changeRowsPerPage}
        isLoading={isLoading}
        onUpdateClient={handleUpdateClient}
      />
    </Page>
  )
}
