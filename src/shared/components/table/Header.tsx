import { IconButton, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs'
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
                  sortBy === column.id && sortOrder === 'asc' ? (
                    <BsArrowUpShort size={20} />
                  ) : (
                    <BsArrowDownShort size={20} />
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
