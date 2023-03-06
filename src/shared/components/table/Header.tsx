import { Box, IconButton, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BsArrowUpShort } from 'react-icons/bs'
import { PaginationParams } from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import { type TableHeaderProps } from './types'

export default function TableHeader({ columns, hasFilter }: TableHeaderProps): JSX.Element {
  const bg = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('black', 'white')
  const { getParam, handleAddParams } = useURLSearchParams()
  const sortOrder = getParam(PaginationParams.sortOrder)
  const sortBy = getParam(PaginationParams.sortBy)

  const handleSort = (columnId: string, order: 'asc' | 'desc'): void => {
    handleAddParams({
      [PaginationParams.sortBy]: columnId,
      [PaginationParams.sortOrder]: order,
    })
  }

  useEffect(() => {
    const defaultSortColumn = columns.find((column) => column.defaultSort)
    if (!defaultSortColumn) return
    handleSort(defaultSortColumn.id, defaultSortColumn.defaultSort ?? 'desc')
  }, [columns])

  return (
    <Thead bg={bg}>
      <Tr h={16}>
        {columns.map(({ align, label, isSortable, id, ...rest }) => (
          <Th key={id} color={textColor} textAlign={align} data-cy={`table-header-${id}`} {...rest}>
            {label}
            {isSortable && (
              <IconButton
                ml={1}
                aria-label={`sort by ${label}`}
                data-cy='table-sort-button'
                icon={
                  <Box
                    w='fit-content'
                    h='fit-content'
                    transform={
                      sortBy === id && sortOrder === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'
                    }
                    transition='transform 0.2s'
                  >
                    <BsArrowUpShort size={20} />
                  </Box>
                }
                variant='unstyled'
                onClick={() => {
                  handleSort(id, sortOrder === 'asc' || !sortOrder ? 'desc' : 'asc')
                }}
                opacity={sortBy === id ? 1 : 0.2}
                _hover={{ opacity: 1 }}
              />
            )}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}
