import { Avatar, IconButton, Td, Tr } from '@chakra-ui/react'
import { TbPencil } from 'react-icons/tb'
import Table from '../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../shared/components/table/types'
import { type ClientModel } from '../../types/model/Client'

type ClientsTableProps = {
  data: ClientModel[] | undefined
  totalClients: number
  isLoading: boolean
  onUpdateClient: (uuid: string) => void
}
export default function ClientsTable({
  data,
  isLoading,
  totalClients,
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
        totalLength: totalClients,
      }}
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((client, index) => (
        <Tr key={index}>
          <Td>
            <Avatar loading='lazy' src={client.profileImage} name={client.name} />
          </Td>
          <Td
            title={client.name}
            maxW={40}
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {client.name}
          </Td>
          <Td title={client.nickname}>{client.nickname}</Td>
          <Td>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(client?.balance ?? 0)}
          </Td>
          <Td>{client?.contact?.phone}</Td>
          <Td textAlign='center'>
            <IconButton
              aria-label='Editar cliente'
              icon={<TbPencil />}
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
  { id: 'name', label: 'Nome', isSortable: true },
  { id: 'nickname', label: 'Apelido', isSortable: true },
  { id: 'balance', label: 'Saldo', isSortable: true },
  { id: 'phone', label: 'Telefone' },
  { id: 'actions', label: 'Ações', align: 'center' },
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
