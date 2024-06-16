import IconButton from '../../../../../../../../shared/components/IconButton'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import DownloadAccountButton from '../../../../../../components/Client/DownloadAccountButton'
import { type SacariaTransactionModel } from '../../../../../../types/model/Transaction'
import DownloadSacariaAccountTemplate from '../Template/Template'
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
          <>
            <DownloadAccountButton
              account='bags'
              template={(data) => {
                return <DownloadSacariaAccountTemplate data={data} />
              }}
            />
            <IconButton
              icon='add'
              onClick={onClickAdd}
              aria-label='adicionar sacaria'
              title='Fazer lançamento de sacaria'
            />
          </>
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
  },
  {
    id: 'description',
    label: 'Descrição',
  },
  {
    id: 'book.number',
    label: 'Talão',
    textAlign: 'center',
  },
  {
    id: 'sheet.number',
    label: 'Folha',
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
