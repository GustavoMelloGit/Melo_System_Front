import TableAddButton from '../../../../../../../../shared/components/table/buttons/Add'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type SacariaTransactionModel } from '../../../../../../types/model/Transaction'
import SacariaAccountTableRow from './Row'

type Props = CustomTableComponentProps<SacariaTransactionModel[]> & {
  onClickAdd: () => void
}

export default function SacariaAccountTable({
  data,
  isLoading,
  totalLength,
  onClickAdd,
}: Props): JSX.Element {
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
        totalLength,
      }}
      filter={{
        searchForOptions,
        actions: (
          <TableAddButton
            onClick={onClickAdd}
            aria-label='adicionar sacaria'
            title='Fazer lançamento'
          />
        ),
      }}
    >
      {data?.map((transaction) => (
        <SacariaAccountTableRow key={transaction.id} transaction={transaction} />
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
    id: 'date',
    label: 'Data',
    isSortable: true,
    defaultSort: 'desc',
  },
  {
    id: 'sheet.number',
    label: 'Folha',
    textAlign: 'center',
  },
  {
    id: 'book.number',
    label: 'Talão',
    textAlign: 'center',
  },
  {
    id: 'type.value',
    label: 'Sacos',
    textAlign: 'center',
  },
  {
    id: 'clientBalance',
    label: 'Saldo',
    isSortable: true,
    textAlign: 'center',
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]
