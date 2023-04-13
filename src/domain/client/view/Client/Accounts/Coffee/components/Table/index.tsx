import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
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
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((transaction) => (
        <CoffeeAccountTableRow key={transaction.id} transaction={transaction} />
      ))}
    </Table>
  )
}

const searchForOptions: SearchForOption = {
  date: {
    label: 'Data',
    inputProps: {
      type: 'date',
      valueGetter: (value) => String(new Date(value).getTime()),
    },
  },
}

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'bags',
    label: 'Sacos',
  },
  {
    id: 'details.type',
    label: 'Bebida',
    isSortable: true,
  },
  {
    id: 'details.moisture',
    label: 'Umidade',
    isSortable: true,
    textAlign: 'center',
  },
  {
    id: 'details.picking',
    label: 'Cata',
    isSortable: true,
    textAlign: 'center',
  },
  {
    id: 'details.sieve',
    label: '17 / 18',
    isSortable: true,
    textAlign: 'center',
  },
  {
    id: 'details.drilled',
    label: 'Broca',
    isSortable: true,
    textAlign: 'center',
  },
  {
    id: 'details.foulness',
    label: 'Impureza',
    isSortable: true,
    textAlign: 'center',
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
