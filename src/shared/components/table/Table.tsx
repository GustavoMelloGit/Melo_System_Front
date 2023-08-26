import {
  Box,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  useColorModeValue,
} from '@chakra-ui/react'
import TableFilters from './Filters'
import TableHeader from './Header'
import TablePagination from './Pagination'
import TableRow from './Row'
import { type TableProps } from './types'

export default function Table({
  header,
  pagination,
  rows,
  children,
  filter,
  table,
}: TableProps): JSX.Element {
  const trHoverColor = useColorModeValue('gray.300', 'gray.600')
  return (
    <Box w='full'>
      {filter && <TableFilters {...filter} />}
      <TableContainer
        sx={{
          '& td': {
            py: 2.5,
          },
          '& #no-data-cell': {
            py: 10,
          },
          '& tbody tr': {
            _hover: {
              bg: trHoverColor,
            },
          },
          roundedTop: filter ? 0 : 16,
        }}
      >
        <ChakraTable variant='simple' pos='relative' {...table}>
          <TableHeader {...header} />
          <Tbody>
            <TableRow {...rows}>{children}</TableRow>
          </Tbody>
        </ChakraTable>
      </TableContainer>
      <TablePagination {...pagination} />
    </Box>
  )
}
