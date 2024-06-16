import IconButton from '../../../../../../../../shared/components/IconButton'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import DownloadAccountButton from '../../../../../../components/Client/DownloadAccountButton'
import { type FertilizerTransactionModel } from '../../../../../../types/model/Transaction'
import DownloadCheckingAccountTemplate from '../Template/Template'
import FertilizerAccountTableRow from './Row'

type Props = CustomTableComponentProps<FertilizerTransactionModel[]> & {
  onClickSell: () => void
}

export default function FertilizerAccountTable({
  data,
  isLoading,
  totalLength,
  onClickSell,
}: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum adubo encontrado.',
      }}
      pagination={{
        totalLength,
      }}
      filter={{
        searchForOptions,
        actions: (
          <>
            <DownloadAccountButton
              account='fertilizer'
              template={(data) => {
                return <DownloadCheckingAccountTemplate data={data} />
              }}
            />
            <IconButton
              icon='sell'
              onClick={onClickSell}
              aria-label='vender adubo'
              title='Vender adubo'
            />
          </>
        ),
      }}
    >
      {data?.map((transaction) => (
        <FertilizerAccountTableRow key={transaction.id} transaction={transaction} />
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
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]
