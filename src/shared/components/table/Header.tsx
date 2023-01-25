import { Th, Thead, Tr } from '@chakra-ui/react'
import { TableHeaderProps } from './types'

export default function TableHeader({ columns }: TableHeaderProps): JSX.Element {
  return (
    <Thead>
      <Tr>
        {columns.map((column) => (
          <Th key={column.id}>{column.label}</Th>
        ))}
      </Tr>
    </Thead>
  )
}
