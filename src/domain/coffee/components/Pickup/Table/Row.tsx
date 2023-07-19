import { Flex, Td, Tr } from '@chakra-ui/react'
import { cloneElement } from 'react'
import IconButton from '../../../../../shared/components/IconButton'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
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
      <IconButton
        icon='edit'
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
      <IconButton
        icon='check'
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
      <IconButton
        icon='uncheck'
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
      <Td data-cy='pickupCoffee-table-clientName'>{pickup.client.code}</Td>
      <Td data-cy='pickupCoffee-table-clientName'>{pickup.client.name}</Td>
      <Td data-cy='pickupCoffee-table-bags' textAlign='center'>
        {pickup.bags}
      </Td>
      <Td data-cy='pickupCoffee-table-brook'>{pickup.brook}</Td>
      <CollapsibleTd>{pickup.complement}</CollapsibleTd>
      <Td textAlign='center'>
        <Flex align='center' justify='center' gap={1}>
          {actions.map((action) =>
            cloneElement(buttonByAction[action], {
              key: action,
            }),
          )}
        </Flex>
      </Td>
    </Tr>
  )
}
