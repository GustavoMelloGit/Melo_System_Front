import { Avatar, IconButton, Td, Tr } from '@chakra-ui/react'
import { TbPencil } from 'react-icons/tb'
import Table from '../../../../shared/components/table/Table'
import { type SearchForOption, type TableHeaderColumns } from '../../../../shared/components/table/types'
import { type ClientModel } from '../../types/model/Client'

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
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum cliente encontrado',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
        onNextPage,
        onPreviousPage,
        onRowsPerPageChange: onChangeRowsPerPage,
      }}
      filter={{
        searchForOptions,
      }}
    >
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
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'photo', label: 'Foto' },
  { id: 'name', label: 'Nome' },
  { id: 'nickname', label: 'Apelido' },
  { id: 'balance', label: 'Saldo' },
  { id: 'phone', label: 'Telefone' },
  { id: 'actions', label: '' },
]
const searchForOptions: SearchForOption[] = [
  {
    label: 'Nome',
    value: 'name',
  },
  {
    label: 'Apelido',
    value: 'nickname',
  },
  {
    label: 'ID',
    value: 'id',
  },
  {
    label: 'Córrego',
    value: 'address.brook',
  },
]
