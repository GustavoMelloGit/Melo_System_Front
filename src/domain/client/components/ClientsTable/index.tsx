import Table from '../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../shared/components/table/types'
import { type ClientModel } from '../../types/model/Client'
import ClientsTableRow from './Row'

type ClientsTableProps = {
  data: ClientModel[] | undefined
  totalClients: number
  isLoading: boolean
}
export default function ClientsTable({
  data,
  isLoading,
  totalClients,
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
        <ClientsTableRow key={index} client={client} />
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
