import { Flex, Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { getColorByValue } from '../../../../../lib/utils/styles'
import IconButton from '../../../../../shared/components/IconButton'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
import { type FertilizerModel } from '../../../types/model/Fertilizer'

type Props = {
  fertilizer: FertilizerModel
  onClickDelete: (id: string) => Promise<void>
  onClickCredit: (fertilizer: FertilizerModel) => Promise<void>
}
const FertilizerTableRow = ({ fertilizer, onClickDelete, onClickCredit }: Props): JSX.Element => {
  return (
    <Tr>
      <Td data-cy='table-cell-fertilizer-createdAt'>
        {format(fertilizer.createdAt, 'dd/MM/yyyy')}
      </Td>
      <Td data-cy='table-cell-fertilizer-name'>{fertilizer.name}</Td>
      <Td
        data-cy='table-cell-fertilizer-quantity'
        textAlign='center'
        color={getColorByValue(fertilizer.quantity ?? 0)}
      >
        {fertilizer.quantity ?? 0}
      </Td>
      <CollapsibleTd>{fertilizer.description ?? '--'}</CollapsibleTd>
      <Td>
        <Flex justify='center' gap={1}>
          <IconButton
            aria-label='Definir quantidade'
            title='Definir quantidade'
            icon='add'
            colorScheme='blue'
            onClick={async () => onClickCredit(fertilizer)}
          />
          <IconButton
            aria-label='Deletar adubo'
            title='Deletar adubo'
            icon='remove'
            colorScheme='red'
            onClick={async () => onClickDelete(fertilizer.id)}
          />
        </Flex>
      </Td>
    </Tr>
  )
}
export default FertilizerTableRow
