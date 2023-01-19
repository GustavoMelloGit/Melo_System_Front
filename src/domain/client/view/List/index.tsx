import {
  Avatar,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import SpinLoader from '../../../../shared/components/SpinLoader'
import TablePagination from '../../../../shared/components/table/Pagination'
import useClientsListView from './useView'

export default function ClientsListView(): JSX.Element {
  const { data, isLoading, fetchNextPage, fetchPreviousPage, changeRowsPerPage } =
    useClientsListView()
  return (
    <VStack align='stretch' spacing={10}>
      <Heading>Clientes</Heading>
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
            {data?.map((client) => (
              <Tr key={client.id}>
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
