import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import EscolhaAccountTableRow from './Row'

type Props = CustomTableComponentProps<EscolhaTransactionModel[]>

export default function EscolhaAccountTable({ data, isLoading, totalLength }: Props): JSX.Element {
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
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((transaction) => (
        <EscolhaAccountTableRow key={transaction.id} transaction={transaction} />
      ))}
    </Table>
  )
}

const searchForOptions: SearchForOption = {
  date: {
    label: 'Data',
    inputProps: {
      type: 'date',
    },
  },
}

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'bags',
    label: 'Sacos',
  },
  {
    id: 'utilization',
    label: 'Aproveitamento',
    isSortable: true,
  },
  {
    id: 'impurity',
    label: 'Impureza',
    isSortable: true,
  },
  {
    id: 'createdAt',
    label: 'Data',
    isSortable: true,
    defaultSort: 'desc',
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]
