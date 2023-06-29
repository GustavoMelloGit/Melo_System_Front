import Table from '../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../shared/components/table/types'
import { type ClientModel } from '../../../types/model/Client'
import ClientsTableRow from './Row'

type ClientsTableProps = {
  data: ClientModel[] | undefined
  totalClients: number
  isLoading: boolean
  onRemove: (id: string) => void
}
export default function ClientsTable({
  data,
  isLoading,
  totalClients,
  onRemove,
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
        totalLength: totalClients,
      }}
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((client, index) => (
        <ClientsTableRow onRemove={onRemove} key={index} client={client} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'photo', label: 'Foto', align: 'center' },
  { id: 'name', label: 'Nome', isSortable: true },
  { id: 'nickname', label: 'Apelido', isSortable: true },
  { id: 'balance', label: 'Saldo', isSortable: true },
  { id: 'phone', label: 'Telefone' },
  { id: 'actions', label: 'Ações', align: 'center' },
]

const searchForOptions: SearchForOption = {
  name: { label: 'Nome' },
  nickname: { label: 'Apelido' },
  id: { label: 'ID' },
  'address.brook': { label: 'Córrego' },
}
