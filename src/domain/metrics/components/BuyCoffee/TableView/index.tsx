import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type GetBuyCoffeeMetricsResponse } from '../../../types/buy-coffee-metrics'
import BuyCoffeeMetricsTableViewRow from './Row'

type Props = {
  data?: GetBuyCoffeeMetricsResponse
  isLoading: boolean
}
export default function BuyCoffeeMetricsTableView({ data, isLoading }: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.data.length ?? 0,
        noDataMessage: 'Nenhum dado encontrado',
      }}
      pagination={{
        totalLength: data?.data.length ?? 0,
        showPagination: false,
      }}
    >
      {data?.data.map((transaction) => (
        <BuyCoffeeMetricsTableViewRow key={transaction._id} metric={transaction} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'date', label: 'Data', isSortable: true },
  { id: 'client.searchableName', label: 'Nome do Cliente', isSortable: true },
  { id: 'valuePerBag', label: 'Valor P/ Saca', isSortable: true },
  { id: 'value', label: 'Sacas', isSortable: true },
]
