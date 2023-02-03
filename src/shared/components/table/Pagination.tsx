import { Flex, IconButton, Select, Show, Text, useColorModeValue } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_ROWS_PER_PAGE_OPTIONS,
  PaginationParams,
} from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import { type TablePaginationProps } from './types'

export default function TablePagination({
  dataLength,
  totalLength,
}: TablePaginationProps): JSX.Element {
  const bg = useColorModeValue('gray.300', 'gray.700')
  const { handleAddParam, getParam } = useURLSearchParams()
  const page = getParam(PaginationParams.page) ? Number(getParam(PaginationParams.page)) : 1
  const limit = getParam(PaginationParams.rowsPerPage)
    ? Number(getParam(PaginationParams.rowsPerPage))
    : DEFAULT_PAGINATION_LIMIT
  const isFirstPage = page <= 1
  const isLastPage = dataLength < limit

  const handleNextPage = (): void => {
    handleAddParam(PaginationParams.page, page ? Number(page) + 1 : 2)
  }

  const handlePreviousPage = (): void => {
    handleAddParam(PaginationParams.page, page ? Number(page) - 1 : 1)
  }

  const handleSetRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = Number(event.target.value)
    handleAddParam(PaginationParams.rowsPerPage, value)
  }

  return (
    <Flex
      align='center'
      w='full'
      justify='flex-end'
      gap={[1, 3]}
      bgColor={bg}
      roundedBottom={16}
      py={1}
      px={[3, 1]}
    >
      <Show above='sm'>
        <Text>
          {totalLength} {totalLength === 1 ? 'Item' : 'Items'}
        </Text>
      </Show>
      <Select w={'fit-content'} onChange={handleSetRowsPerPage} value={limit}>
        {DEFAULT_ROWS_PER_PAGE_OPTIONS.map((rowsPerPage) => (
          <option key={rowsPerPage} value={rowsPerPage}>
            {rowsPerPage} {rowsPerPage === 1 ? 'Item' : 'Items'}
          </option>
        ))}
      </Select>
      <Flex align='center' gap={[1, 2]} px={[0, 4]}>
        <IconButton
          size={['sm', 'md']}
          variant='ghost'
          aria-label='Previous page'
          icon={<IoIosArrowBack />}
          onClick={handlePreviousPage}
          isDisabled={isFirstPage}
        />
        <Text>{page}</Text>
        <IconButton
          size={['sm', 'md']}
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
