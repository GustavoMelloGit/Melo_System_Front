import { Badge, Flex, LinkBox, LinkOverlay, Td, Tr } from '@chakra-ui/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import IconButton from '../../../../../shared/components/IconButton'
import { SheetsEmitter } from '../../../events/sheets'
import { type SheetModel } from '../../../types/model/sheet'

export type Props = {
  sheet: SheetModel
}
export default function SheetsTableRow({ sheet }: Props): JSX.Element {
  const { number } = useParams<{ number: string }>()
  if (!number) return <Navigate to={Routes.books} replace />
  return (
    <LinkBox as={Tr} h={61}>
      <Td>{sheet.number}</Td>
      <Td>{sheet.client.name}</Td>
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
            <LinkOverlay as={Link} to={Routes.updateSheet(number, sheet.number)}>
              <IconButton icon='edit' as='span' aria-label='Editar folha' colorScheme='blue' />
            </LinkOverlay>
            <IconButton
              aria-label='Excluir folha'
              onClick={() => {
                SheetsEmitter.emit('removeSheet', sheet.number)
              }}
              colorScheme='red'
              icon='remove'
            />
          </Flex>
        ) : (
          <Flex justify='center'>
            <LinkOverlay as={Link} to={Routes.sheetDetails(number, sheet.number)}>
              <IconButton icon='linkTo' aria-label='Visualizar folha' colorScheme='blue' />
            </LinkOverlay>
          </Flex>
        )}
      </Td>
    </LinkBox>
  )
}
