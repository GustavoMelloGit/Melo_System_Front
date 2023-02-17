import { Box, IconButton, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BsArrowUpShort } from 'react-icons/bs'
import { PaginationParams } from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import { type TableHeaderProps } from './types'

export default function TableHeader({ columns }: TableHeaderProps): JSX.Element {
  const bg = useColorModeValue('gray.300', 'gray.700')
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
        {columns.map((column) => (
          <Th key={column.id} color={textColor} textAlign={column.align}>
            {column.label}
            {column.isSortable && (
              <IconButton
                ml={1}
                aria-label={`sort by ${column.label}`}
                icon={
                  <Box
                    w='fit-content'
                    h='fit-content'
                    transform={
                      sortBy === column.id && sortOrder === 'asc'
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)'
                    }
                    transition='transform 0.2s'
                  >
                    <BsArrowUpShort size={20} />
                  </Box>
                }
                variant='unstyled'
                onClick={() => {
                  handleSort(column.id, sortOrder === 'asc' || !sortOrder ? 'desc' : 'asc')
                }}
                opacity={sortBy === column.id ? 1 : 0.2}
                _hover={{ opacity: 1 }}
              />
            )}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}
