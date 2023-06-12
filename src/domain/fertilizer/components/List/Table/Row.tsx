import { Collapse, Flex, Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { getColorByValue } from '../../../../../lib/utils/styles'
import TableButton from '../../../../../shared/components/table/buttons'
import { type FertilizerModel } from '../../../types/model/Fertilizer'

type Props = {
  fertilizer: FertilizerModel
  onClickDelete: (id: string) => Promise<void>
  onClickCredit: (fertilizer: FertilizerModel) => Promise<void>
}
const FertilizerTableRow = ({ fertilizer, onClickDelete, onClickCredit }: Props): JSX.Element => {
  const [showText, setShowText] = useState(false)
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
      <Td
        title={fertilizer.description ?? '--'}
        cursor='pointer'
        onClick={() => {
          setShowText((prev) => !prev)
        }}
        wordBreak='break-word'
        whiteSpace='pre-wrap'
        maxW={400}
      >
        <Collapse startingHeight={20} in={showText}>
          {fertilizer.description || '--'}
        </Collapse>
      </Td>
      <Td>
        <Flex justify='center' gap={1}>
          <TableButton
            aria-label='Definir quantidade'
            title='Definir quantidade'
            icon='add'
            colorScheme='blue'
            onClick={async () => onClickCredit(fertilizer)}
          />
          <TableButton
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
