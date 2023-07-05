import IconButton from '../../../../../../../../shared/components/IconButton'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import EscolhaAccountTableRow from './Row'

type Props = CustomTableComponentProps<EscolhaTransactionModel[]> & {
  onClickAdd: () => void
  onClickBuy: () => void
}

export default function EscolhaAccountTable({
  data,
  isLoading,
  totalLength,
  onClickAdd,
  onClickBuy,
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
          <>
            <IconButton
              icon='shopCart'
              onClick={onClickBuy}
              aria-label='Comprar escolha'
              title='Comprar escolha'
            />
            <IconButton
              icon='add'
              onClick={onClickAdd}
              aria-label='adicionar transação'
              title='Fazer lançamento'
            />
          </>
        ),
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
    id: 'date',
    label: 'Data',
    isSortable: true,
  },
  {
    id: 'description',
    label: 'Descrição',
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
    id: 'type.value',
    label: 'Pesagem',
  },
  {
    id: 'clientBalance',
    label: 'Saldo',
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]
