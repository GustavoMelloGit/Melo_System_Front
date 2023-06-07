import { Td, Tr } from '@chakra-ui/react'
import TableCheckButton from '../../../../../shared/components/table/buttons/Check'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import TableUncheckButton from '../../../../../shared/components/table/buttons/Uncheck'
import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'

type Props = {
  pickup: FertilizerDeliveryModel
  onClickUpdate: (pickup: FertilizerDeliveryModel) => Promise<void>
  onClickCheck: (pickup: FertilizerDeliveryModel) => Promise<void>
  onClickUncheck: (pickup: FertilizerDeliveryModel) => Promise<void>
  variant?: 'completed' | 'pending'
}
export default function DeliveryTableRow({
  pickup,
  onClickUpdate,
  onClickCheck,
  onClickUncheck,
  variant = 'pending',
}: Props): JSX.Element {
  let secondaryAction: JSX.Element

  switch (variant) {
    case 'completed':
      secondaryAction = (
        <TableUncheckButton
          aria-label='Desmarcar pedido de coleta'
          title='Desmarcar pedido de coleta'
          colorScheme='red'
          onClick={() => {
            void onClickUncheck(pickup)
          }}
          data-cy='pickupCoffee-uncheck'
        />
      )
      break
    case 'pending':
      secondaryAction = (
        <TableCheckButton
          aria-label='Finalizar pedido de coleta'
          title='Finalizar pedido de coleta'
          colorScheme='green'
          onClick={() => {
            void onClickCheck(pickup)
          }}
          data-cy='pickupCoffee-check'
        />
      )
      break
    default:
      secondaryAction = <></>
  }

  return (
    <Tr>
      <Td data-cy='pickupCoffee-table-clientName'>{pickup.clientName}</Td>
      <Td data-cy='pickupCoffee-table-fertilizerName'>{pickup.fertilizer.name}</Td>
      <Td data-cy='pickupCoffee-table-bags'>{pickup.amount}</Td>
      <Td data-cy='pickupCoffee-table-brook'>{pickup.brook}</Td>
      <Td data-cy='pickupCoffee-table-complement'>{pickup.complement}</Td>
      <Td textAlign='center'>
        <TableEditButton
          aria-label='Editar pedido de coleta'
          title='Editar pedido de coleta'
          colorScheme='blue'
          onClick={() => {
            void onClickUpdate(pickup)
          }}
          data-cy='pickupCoffee-edit'
        />
        {secondaryAction}
      </Td>
    </Tr>
  )
}
