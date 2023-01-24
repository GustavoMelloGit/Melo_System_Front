import {
  Avatar,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { TbPencil } from 'react-icons/tb'
import SpinLoader from '../../../../shared/components/SpinLoader'
import TablePagination from '../../../../shared/components/table/Pagination'
import { ClientModel } from '../../types/model/Client'

type ClientsTableProps = {
  data: ClientModel[] | undefined
  onNextPage: () => void
  onPreviousPage: () => void
  onChangeRowsPerPage: (rowsPerPage: number) => void
  isLoading: boolean
  onUpdateClient: (uuid: string) => void
}
export default function ClientsTable({
  data,
  onNextPage,
  onPreviousPage,
  isLoading,
  onChangeRowsPerPage,
  onUpdateClient,
}: ClientsTableProps): JSX.Element {
  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Foto</Th>
              <Th>Nome</Th>
              <Th>Apelido</Th>
              <Th>Saldo</Th>
              <Th>Telefone</Th>
              <Th></Th>
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
                <Td>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Math.random() * 1000)}
                </Td>
                <Td>(32) 99999-9999</Td>
                <Td>
                  <IconButton
                    aria-label='Editar cliente'
                    icon={<TbPencil />}
                    colorScheme='blue'
                    variant='ghost'
                    onClick={() => {
                      onUpdateClient(client.id)
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TablePagination
        dataLength={data?.length ?? 0}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </>
  )
}
