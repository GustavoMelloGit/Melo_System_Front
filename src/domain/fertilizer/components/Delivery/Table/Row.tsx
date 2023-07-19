import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import IconButton from '../../../../../shared/components/IconButton'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'

type Props = {
  delivery: FertilizerDeliveryModel
  onClickUpdate: (pickup: FertilizerDeliveryModel) => Promise<void>
  onClickCheck: (pickup: FertilizerDeliveryModel) => Promise<void>
  onClickUncheck: (pickup: FertilizerDeliveryModel) => Promise<void>
  variant?: 'completed' | 'pending'
}
export default function DeliveryTableRow({
  delivery,
  onClickUpdate,
  onClickCheck,
  onClickUncheck,
  variant = 'pending',
}: Props): JSX.Element {
  let secondaryAction: JSX.Element

  switch (variant) {
    case 'completed':
      secondaryAction = (
        <IconButton
          icon='uncheck'
          aria-label='Desmarcar pedido de coleta'
          title='Desmarcar pedido de coleta'
          colorScheme='red'
          onClick={() => {
            void onClickUncheck(delivery)
          }}
          data-cy='deliveryCoffee-uncheck'
        />
      )
      break
    case 'pending':
      secondaryAction = (
        <IconButton
          icon='check'
          aria-label='Finalizar pedido de coleta'
          title='Finalizar pedido de coleta'
          colorScheme='green'
          onClick={() => {
            void onClickCheck(delivery)
          }}
          data-cy='deliveryCoffee-check'
        />
      )
      break
    default:
      secondaryAction = <></>
  }

  return (
    <Tr>
      <Td data-cy='deliveryCoffee-table-date'>{dateToFormat(delivery.date ?? 0, 'dd/MM/yyyy')}</Td>
      <CollapsibleTd data-cy='deliveryCoffee-table-clientName'>
        {delivery.client.name}
      </CollapsibleTd>
      <CollapsibleTd data-cy='deliveryCoffee-table-fertilizerName'>
        {delivery.fertilizer.name}
      </CollapsibleTd>
      <Td data-cy='deliveryCoffee-table-bags' textAlign='center'>
        {delivery.amount}
      </Td>
      <Td data-cy='deliveryCoffee-table-brook'>{delivery.brook}</Td>
      <CollapsibleTd data-cy='deliveryCoffee-table-complement'>{delivery.complement}</CollapsibleTd>
      <Td textAlign='center'>
        <IconButton
          icon='edit'
          aria-label='Editar pedido de coleta'
          title='Editar pedido de coleta'
          colorScheme='blue'
          onClick={() => {
            void onClickUpdate(delivery)
          }}
          data-cy='deliveryCoffee-edit'
        />
        {secondaryAction}
      </Td>
    </Tr>
  )
}
