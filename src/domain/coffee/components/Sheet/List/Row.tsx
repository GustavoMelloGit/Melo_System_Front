import { Badge, Flex, LinkOverlay, Td } from '@chakra-ui/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import IconButton from '../../../../../shared/components/IconButton'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { SheetsEmitter } from '../../../events/sheets'
import { type SheetModel } from '../../../types/model/sheet'

export type Props = {
  sheet: SheetModel
}
export default function SheetsTableRow({ sheet }: Props): JSX.Element {
  const { number } = useParams<{ number: string }>()
  if (!number) return <Navigate to={Routes.books} replace />
  return (
    <LinkRow>
      <Td>
        <LinkRow.Link to={Routes.sheetDetails(number, sheet.number)}>{sheet.number}</LinkRow.Link>
      </Td>
      <Td>
        {sheet.client.code} - {sheet.client.name}
      </Td>
      <Td>{sheet.courier}</Td>
      <Td>{dateToFormat(sheet.weighingDate, 'dd/MM/yyyy')}</Td>
      <Td textAlign='center'>
        <Badge colorScheme={sheet.isDraft ? 'blue' : 'green'}>
          {sheet.isDraft ? 'Rascunho' : 'Creditado'}
        </Badge>
      </Td>
      <Td>
        {sheet.isDraft ? (
          <Flex justify='center'>
            <LinkOverlay as={Link} to={Routes.updateSheet(number, sheet.number)} zIndex={2}>
              <IconButton icon='edit' as='span' aria-label='Editar folha' colorScheme='blue' />
            </LinkOverlay>
            <IconButton
              aria-label='Excluir folha'
              onClick={() => {
                SheetsEmitter.emit('removeSheet', sheet.number)
              }}
              colorScheme='red'
              icon='remove'
              zIndex={2}
            />
          </Flex>
        ) : (
          <Flex justify='center'>
            <IconButton icon='linkTo' aria-label='Visualizar folha' colorScheme='blue' />
          </Flex>
        )}
      </Td>
    </LinkRow>
  )
}
