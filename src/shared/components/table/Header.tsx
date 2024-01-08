import { Box, IconButton, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
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

  return (
    <Thead bg={bg}>
      <Tr h={16}>
        {columns.map(({ align, label, isSortable, id, ...rest }) => (
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
            <Text as='span' pos='relative'>
              {label}
              {isSortable && (
                <IconButton
                  aria-label={`sort by ${label}`}
                  data-cy='table-sort-button'
                  minW={0}
                  minH={0}
                  ml={1}
                  pos='absolute'
                  left='100%'
                  top='50%'
                  transform='translateY(-50%)'
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
            </Text>
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}
