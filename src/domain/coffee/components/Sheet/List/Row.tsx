import { Badge, Flex, Td, Tr } from '@chakra-ui/react'
import { formatDate } from '../../../../../lib/utils/formatters'
import TableButton from '../../../../../shared/components/table/buttons'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import { type SheetModel } from '../../../types/model/sheet'

export type Props = {
  sheet: SheetModel
  onClickDelete?: () => Promise<void> | void
}
export default function SheetsTableRow({ sheet, onClickDelete }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{sheet.number}</Td>
      <Td>{sheet.client.name}</Td>
      <Td>{sheet.courier}</Td>
      <Td>{formatDate(sheet.weighingDate, false)}</Td>
      <Td textAlign='center'>
        <Badge colorScheme={sheet.isDraft ? 'blue' : 'green'}>
          {sheet.isDraft ? 'Rascunho' : 'Creditado'}
        </Badge>
      </Td>
      <Td>
        {sheet.isDraft && (
          <Flex>
            <TableEditButton aria-label='Editar folha' colorScheme='blue' />
            <TableButton
              aria-label='Excluir folha'
              onClick={onClickDelete}
              colorScheme='red'
              icon='remove'
            />
          </Flex>
        )}
      </Td>
    </Tr>
  )
}
