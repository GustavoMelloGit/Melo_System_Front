import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type TransactionModel } from '../../../../../../types/model/Transaction'
import CoffeeAccountTableRow from './Row'

type Props = CustomTableComponentProps<TransactionModel[]>

export default function CoffeeAccountTable({ data, isLoading, totalLength }: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum registro encontrado',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
        totalLength,
      }}
    >
      {data?.map((transaction) => (
        <CoffeeAccountTableRow key={transaction.id} transaction={transaction} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'createdAt',
    label: 'Data',
    isSortable: true,
  },
]
