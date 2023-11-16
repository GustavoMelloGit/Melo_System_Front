import { Routes } from '../../../../../../../../lib/routes'
import IconButton from '../../../../../../../../shared/components/IconButton'
import Link from '../../../../../../../../shared/components/Link'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type FertilizerTransactionModel } from '../../../../../../types/model/Transaction'
import FertilizerAccountTableRow from './Row'

type Props = CustomTableComponentProps<FertilizerTransactionModel[]> & {
  clientId: string
}

export default function FertilizerAccountTable({
  data,
  isLoading,
  totalLength,
  clientId,
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
            <IconButton
              as={Link}
              // @ts-expect-error this property does exist
              to={`${Routes.sellProduct}?client=${clientId}`}
              icon='sell'
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
