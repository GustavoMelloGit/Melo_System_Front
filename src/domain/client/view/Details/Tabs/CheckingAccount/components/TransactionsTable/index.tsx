import Table from '../../../../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type TransactionModel } from '../../../../../../types/model/Transaction'
import TransactionsListRow from './Row'

type TransactionsTableProps = {
  data: TransactionModel[]
  total: number
  isLoading: boolean
}
export default function TransactionsTable({
  data,
  isLoading,
  total,
}: TransactionsTableProps): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhuma transação encontrada',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
        totalLength: total,
      }}
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((transaction, index) => (
        <TransactionsListRow key={index} transaction={transaction} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'description', label: 'Descrição' },
  { id: 'value', label: 'Valor', isSortable: true },
  { id: 'actions', label: 'Ações' },
]
const searchForOptions: SearchForOption[] = [
  {
    label: 'Descrição',
    value: 'description',
  },
]
