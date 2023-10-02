import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type ClientModel } from '../../../../client/types/model/Client'
import CredoresDevedoresMetricsTableViewRow from './Row'

type Props = {
  data: ClientModel[]
  isLoading: boolean
}
export default function CredoresDevedoresMetricsTableView({ data, isLoading }: Props): JSX.Element {
  console.log(data)
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data.length ?? 0,
        noDataMessage: 'Nenhum dado encontrado',
      }}
      pagination={{
        totalLength: 0,
        showPagination: false,
      }}
    >
      {data.map((client) => (
        <CredoresDevedoresMetricsTableViewRow key={client.name} client={client} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'code', label: 'Código', isSortable: true },
  { id: 'name', label: 'Cliente', isSortable: true },
  { id: 'balance', label: 'Saldo', isSortable: true },
]
