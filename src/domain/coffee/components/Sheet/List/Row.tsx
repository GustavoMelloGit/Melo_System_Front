import { Badge, Flex, Td, Tr } from '@chakra-ui/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import TableButton from '../../../../../shared/components/table/buttons'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import TableLinkToButton from '../../../../../shared/components/table/buttons/LinkTo'
import { type SheetModel } from '../../../types/model/sheet'

export type Props = {
  sheet: SheetModel
  onClickDelete?: () => Promise<void> | void
}
export default function SheetsTableRow({ sheet, onClickDelete }: Props): JSX.Element {
  const { number } = useParams<{ number: string }>()
  if (!number) return <Navigate to={Routes.books} replace />

  return (
    <Tr h={61}>
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
            <Link to={Routes.updateSheet(number, sheet.number)}>
              <TableEditButton as='span' aria-label='Editar folha' colorScheme='blue' />
            </Link>
            <TableButton
              aria-label='Excluir folha'
              onClick={onClickDelete}
              colorScheme='red'
              icon='remove'
            />
          </Flex>
        ) : (
          <Flex justify='center'>
            <Link to={Routes.sheetDetails(number, sheet.number)}>
              <TableLinkToButton aria-label='Visualizar folha' colorScheme='blue' />
            </Link>
          </Flex>
        )}
      </Td>
    </Tr>
  )
}
