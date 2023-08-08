import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type GetTransactionMetricsResponse } from '../../../types/transaction-metrics'
import TransactionMetricsTableViewRow from './Row'

type Props = {
  data?: GetTransactionMetricsResponse
  isLoading: boolean
}
export default function TransactionMetricsTableView({ data, isLoading }: Props): JSX.Element {
  return (
    <>
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
          <TransactionMetricsTableViewRow key={transaction.id} metric={transaction} />
        ))}
      </Table>
    </>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'date', label: 'Data' },
  { id: 'clientName', label: 'Nome do Cliente' },
  { id: 'type.name', label: 'Conta' },
  { id: 'type.value', label: 'Valor' },
]
