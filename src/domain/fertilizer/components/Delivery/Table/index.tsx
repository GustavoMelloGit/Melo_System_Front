import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'
import DeliveryTableRow from './Row'

type Props = {
  data: FertilizerDeliveryModel[] | undefined
  isLoading: boolean
  totalPickups: number
  onClickUpdate: (delivery: FertilizerDeliveryModel) => Promise<void>
  onClickCheck: (delivery: FertilizerDeliveryModel) => Promise<void>
  onClickUncheck: (delivery: FertilizerDeliveryModel) => Promise<void>
  variant?: 'completed' | 'pending'
}
export default function DeliveryTable({
  data,
  isLoading,
  totalPickups,
  onClickUpdate,
  onClickCheck,
  onClickUncheck,
  variant = 'pending',
}: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum adubo a entregar',
      }}
      pagination={{
        totalLength: totalPickups,
      }}
      table={{
        'data-cy': 'pickupCoffee-table',
      }}
    >
      {data?.map((pickup, index) => (
        <DeliveryTableRow
          key={index}
          pickup={pickup}
          onClickUpdate={onClickUpdate}
          onClickCheck={onClickCheck}
          onClickUncheck={onClickUncheck}
          variant={variant}
        />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'clientName', label: 'Nome do cliente', isSortable: true },
  { id: 'bags', label: 'Adubo', isSortable: true },
  { id: 'amount', label: 'Quantidade', isSortable: true, textAlign: 'center' },
  { id: 'brook', label: 'Córrego', isSortable: true },
  { id: 'complement', label: 'Referência' },
  { id: 'actions', label: 'Ações', align: 'center' },
]
