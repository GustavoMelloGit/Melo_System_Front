import { Tr } from '@chakra-ui/react'
import { type SheetModel } from '../../../types/model/book'

export type Props = {
  sheet: SheetModel
}
export default function SheetsTableRow({ sheet }: Props): JSX.Element {
  return <Tr></Tr>
}
