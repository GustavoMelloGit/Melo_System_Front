import { Flex, Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { formatCurrency } from '../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../lib/utils/getColorByValue'
import IconButton from '../../../../../../shared/components/IconButton'
import { type ProductModel } from '../../../../types/Product'

type Props = {
  fertilizer: ProductModel
  onClickDelete: (id: string) => Promise<void>
  onClickCredit: (fertilizer: ProductModel) => Promise<void>
  onClickEdit: (fertilizer: ProductModel) => Promise<void>
}
const StockTableRow = ({
  fertilizer,
  onClickDelete,
  onClickCredit,
  onClickEdit,
}: Props): JSX.Element => {
  return (
    <Tr>
      <Td data-cy='table-cell-fertilizer-createdAt'>
        {format(fertilizer.createdAt, 'dd/MM/yyyy')}
      </Td>
      <Td data-cy='table-cell-fertilizer-name'>{fertilizer.name}</Td>
      <Td
        data-cy='table-cell-fertilizer-quantity'
        textAlign='right'
        color={getColorByValue(fertilizer.quantity ?? 0)}
      >
        {fertilizer.quantity ?? 0}
      </Td>
      <Td textAlign='right'>{formatCurrency(fertilizer.cost ?? 0)}</Td>
      <Td textAlign='right'>{formatCurrency(fertilizer.sale ?? 0)}</Td>
      <Td>{fertilizer.description ?? '--'}</Td>
      <Td>
        <Flex justify='center' gap={1}>
          <IconButton
            aria-label='Editar produto'
            title='Editar produto'
            icon='edit'
            colorScheme='blue'
            onClick={async () => onClickEdit(fertilizer)}
          />
          <IconButton
            aria-label='Definir quantidade'
            title='Definir quantidade'
            icon='add'
            colorScheme='blue'
            onClick={async () => onClickCredit(fertilizer)}
          />
          <IconButton
            aria-label='Remover produto'
            title='Remover produto'
            icon='remove'
            colorScheme='red'
            onClick={async () => onClickDelete(fertilizer.id)}
          />
        </Flex>
      </Td>
    </Tr>
  )
}
export default StockTableRow
