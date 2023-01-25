import { Table as ChakraTable, TableContainer, Tbody, VStack } from '@chakra-ui/react'
import TableFilters from './Filters'
import TableHeader from './Header'
import TablePagination from './Pagination'
import TableRow from './Row'
import { TableProps } from './types'

export default function Table({ header, pagination, rows, children }: TableProps): JSX.Element {
  return (
    <VStack spacing={2} align='stretch' w='full'>
      <TableFilters />
      <TableContainer>
        <ChakraTable variant='simple'>
          <TableHeader {...header} />
          <Tbody>
            <TableRow {...rows}>{children}</TableRow>
          </Tbody>
        </ChakraTable>
      </TableContainer>
      <TablePagination {...pagination} />
    </VStack>
  )
}
