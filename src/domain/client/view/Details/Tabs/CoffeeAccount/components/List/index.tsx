import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import CoffeeAccountTableRow from './Row'

type Props = CustomTableComponentProps<CoffeeTransactionModel[]>

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
    id: 'clientBalance',
    label: 'KG',
  },
  {
    id: 'createdAt',
    label: 'Data',
    isSortable: true,
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]
