import { IconButton, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
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
      field: columnId,
      order,
    })
  }

  return (
    <Thead bg={bg}>
      <Tr h={16}>
        {columns.map((column) => (
          <Th key={column.id} color={textColor}>
            {column.label}
            {column.isSortable && (
              <IconButton
                ml={1}
                aria-label={`sort by ${column.label}`}
                icon={
                  sortBy === column.id && sortOrder === 'asc' ? (
                    <IoMdArrowDropup size={20} />
                  ) : (
                    <IoMdArrowDropdown size={20} />
                  )
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
