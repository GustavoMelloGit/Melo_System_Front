import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type GetBuyCoffeeMetricsResponse } from '../../../types/coffeePriceMetrics'
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
        <BuyCoffeeMetricsTableViewRow
          key={`${transaction.type}-${transaction.value}-${transaction.weight}`}
          metric={transaction}
        />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'coffeeType', label: 'Tipo de café', isSortable: true },
  { id: 'value', label: 'Valor', isSortable: true },
  { id: 'weight', label: 'Quantidade', isSortable: true },
]
