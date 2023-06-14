import { Flex, Td, Tr } from '@chakra-ui/react'
import TableCheckButton from '../../../../../shared/components/table/buttons/Check'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import TableUncheckButton from '../../../../../shared/components/table/buttons/Uncheck'
import { type PickupCoffeeModel } from '../../../types/model/pickup'

type Action = 'edit' | 'check' | 'uncheck'

type Props = {
  pickup: PickupCoffeeModel
  onClickUpdate: (pickup: PickupCoffeeModel) => Promise<void>
  onClickCheck: (pickup: PickupCoffeeModel) => Promise<void>
  onClickUncheck: (pickup: PickupCoffeeModel) => Promise<void>
  variant?: 'completed' | 'pending'
}
export default function PickupTableRow({
  pickup,
  onClickUpdate,
  onClickCheck,
  onClickUncheck,
  variant = 'pending',
}: Props): JSX.Element {
  const actions: Action[] = []

  const buttonByAction: Record<Action, JSX.Element> = {
    edit: (
      <TableEditButton
        aria-label='Editar pedido de coleta'
        title='Editar pedido de coleta'
        colorScheme='blue'
        onClick={() => {
          void onClickUpdate(pickup)
        }}
        data-cy='pickupCoffee-edit'
      />
    ),
    check: (
      <TableCheckButton
        aria-label='Finalizar pedido de coleta'
        title='Finalizar pedido de coleta'
        colorScheme='green'
        onClick={() => {
          void onClickCheck(pickup)
        }}
        data-cy='pickupCoffee-check'
      />
    ),
    uncheck: (
      <TableUncheckButton
        aria-label='Desmarcar pedido de coleta'
        title='Desmarcar pedido de coleta'
        colorScheme='red'
        onClick={() => {
          void onClickUncheck(pickup)
        }}
        data-cy='pickupCoffee-uncheck'
      />
    ),
  }

  switch (variant) {
    case 'completed':
      actions.push('uncheck')
      break
    case 'pending':
      actions.push('edit')
      actions.push('check')
      break
    default:
      actions.push('edit')
  }

  return (
    <Tr>
      <Td data-cy='pickupCoffee-table-clientName'>{pickup.clientName}</Td>
      <Td data-cy='pickupCoffee-table-bags'>{pickup.bags}</Td>
      <Td data-cy='pickupCoffee-table-brook'>{pickup.brook}</Td>
      <Td data-cy='pickupCoffee-table-complement'>{pickup.complement}</Td>
      <Td textAlign='center'>
        <Flex align='center' justify='center' gap={1}>
          {actions.map((action) => buttonByAction[action])}
        </Flex>
      </Td>
    </Tr>
  )
}
