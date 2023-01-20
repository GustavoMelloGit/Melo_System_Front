import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import SpinLoader from '../../../../shared/components/SpinLoader'
import TablePagination from '../../../../shared/components/table/Pagination'
import useClientsListView from './useView'

export default function ClientsListView(): JSX.Element {
  const {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    changeRowsPerPage,
    handleCreateClient,
  } = useClientsListView()
  return (
    <VStack align='stretch' spacing={10}>
      <Flex as='header' justify='space-between'>
        <Heading>Clientes</Heading>
        <IconButton
          onClick={handleCreateClient}
          aria-label='Criar cliente'
          icon={<AiOutlineUserAdd />}
          variant='outline'
        />
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Foto</Th>
              <Th>Nome</Th>
              <Th>Apelido</Th>
              <Th>Saldo</Th>
              <Th>Telefone</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Tr>
                <Td colSpan={5} textAlign='center'>
                  <SpinLoader />
                </Td>
              </Tr>
            )}
            {data?.length === 0 && (
              <Tr>
                <Td colSpan={5} textAlign='center'>
                  Nenhum cliente encontrado
                </Td>
              </Tr>
            )}
            {data?.map((client, index) => (
              <Tr key={index}>
                <Td>
                  <Avatar loading='lazy' src={client.profileImage} />
                </Td>
                <Td>{client.name}</Td>
                <Td>{client.nickname}</Td>
                <Td>{client.balance}</Td>
                <Td>{client.phone}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TablePagination
        dataLength={data?.length ?? 0}
        onNextPage={fetchNextPage}
        onPreviousPage={fetchPreviousPage}
        onRowsPerPageChange={changeRowsPerPage}
      />
    </VStack>
  )
}
