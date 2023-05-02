import TableAddButton from '../../../../../../../../shared/components/table/buttons/Add'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { type SacariaTransactionModel } from '../../../../../../types/model/Transaction'
import SacariaAccountTableRow from './Row'

type Props = CustomTableComponentProps<SacariaTransactionModel[]>

export default function SacariaAccountTable({ data, isLoading, totalLength }: Props): JSX.Element {
  const openModal = useModal((state) => state.openModal)

  async function handleOpenCreate(): Promise<void> {
    const CreateSacariaView = (await import('../../view/Create')).default
    openModal(<CreateSacariaView />)
  }

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
        actions: (
          <TableAddButton
            onClick={handleOpenCreate}
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
    id: 'clientBalance',
    label: 'Saldo',
    isSortable: true,
  },
  {
    id: 'type.value',
    label: 'Sacos',
    isSortable: true,
  },
  {
    id: 'description',
    label: 'Descrição',
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
