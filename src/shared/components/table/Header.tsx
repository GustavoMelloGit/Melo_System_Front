import { Box, IconButton, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BsArrowUpShort } from 'react-icons/bs'
import { PaginationParams } from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import { type TableHeaderProps } from './types'

export default function TableHeader({ columns }: TableHeaderProps): JSX.Element {
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
        {columns.map(({ align, label, isSortable, id, defaultSort, ...rest }) => (
          <Th
            key={id}
            color={textColor}
            textAlign={align}
            data-cy={`table-header-${id}`}
            onClick={() => {
              if (!isSortable) return
              handleSort(id, sortOrder === 'asc' || !sortOrder ? 'desc' : 'asc')
            }}
            cursor={isSortable ? 'pointer' : 'default'}
            _hover={{
              '& > button': {
                opacity: 1,
              },
            }}
            userSelect={isSortable ? 'none' : 'auto'}
            {...rest}
          >
            {label}
            {isSortable && (
              <IconButton
                aria-label={`sort by ${label}`}
                data-cy='table-sort-button'
                minW={0}
                minH={0}
                ml={1}
                icon={
                  <Box
                    w='fit-content'
                    h='fit-content'
                    transform={
                      sortBy === id && sortOrder === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'
                    }
                    transition='transform 0.2s'
                  >
                    <BsArrowUpShort size={22} />
                  </Box>
                }
                variant='unstyled'
                onClick={() => {
                  handleSort(id, sortOrder === 'asc' || !sortOrder ? 'desc' : 'asc')
                }}
                opacity={sortBy === id ? 1 : 0.4}
              />
            )}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}
