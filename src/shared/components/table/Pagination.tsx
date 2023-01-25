import { Flex, IconButton, Select, Text } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_ROWS_PER_PAGE_OPTIONS,
} from '../../../lib/constants/pagination'
import useParams from '../../hooks/useParams'
import { TablePaginationProps } from './types'

export default function TablePagination({
  dataLength,
  onNextPage,
  onPreviousPage,
  onRowsPerPageChange,
}: TablePaginationProps): JSX.Element {
  const { handleAddParam, getParam } = useParams()
  const page = getParam('page') ? Number(getParam('page')) : 1
  const rowsPerPage = getParam('rowsPerPage')
    ? Number(getParam('rowsPerPage'))
    : DEFAULT_PAGINATION_LIMIT
  const isFirstPage = page <= 1
  const isLastPage = dataLength < rowsPerPage

  const handleNextPage = (): void => {
    const currentPage = getParam('page')
    handleAddParam('page', currentPage ? Number(currentPage) + 1 : 2)
    onNextPage?.()
  }

  const handlePreviousPage = (): void => {
    const currentPage = getParam('page')
    handleAddParam('page', currentPage ? Number(currentPage) - 1 : 1)
    onPreviousPage?.()
  }

  const handleSetRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = Number(event.target.value)
    handleAddParam('rowsPerPage', value)
    onRowsPerPageChange?.(value)
  }

  return (
    <Flex align='center' w='full' justify='flex-end' gap={3}>
      <Text>
        {dataLength} {dataLength === 1 ? 'Item' : 'Items'}
      </Text>
      <Select w={'fit-content'} onChange={handleSetRowsPerPage} value={rowsPerPage}>
        {DEFAULT_ROWS_PER_PAGE_OPTIONS.map((rowsPerPage) => (
          <option key={rowsPerPage} value={rowsPerPage}>
            {rowsPerPage} {rowsPerPage === 1 ? 'Item' : 'Items'}
          </option>
        ))}
      </Select>
      <Flex align='center' gap={2}>
        <IconButton
          variant='ghost'
          aria-label='Previous page'
          icon={<IoIosArrowBack />}
          onClick={handlePreviousPage}
          isDisabled={isFirstPage}
        />
        <Text>{page}</Text>
        <IconButton
          variant='ghost'
          aria-label='Next page'
          icon={<IoIosArrowForward />}
          onClick={handleNextPage}
          isDisabled={isLastPage}
        />
      </Flex>
    </Flex>
  )
}
