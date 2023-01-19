import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type TablePaginationProps = {
  dataLength: number
  colSpan: number
}

export default function TablePagination({
  dataLength,
  colSpan,
}: TablePaginationProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1)
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage === dataLength

  return (
    <Flex align='center' w='full' justify='flex-end' gap={3}>
      <Text>
        {dataLength} {dataLength === 1 ? 'Item' : 'Items'}
      </Text>
      <Flex align='center' gap={2}>
        <IconButton
          variant='ghost'
          aria-label='Previous page'
          icon={<IoIosArrowBack />}
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}
          isDisabled={isFirstPage}
        />
        <Text>{currentPage}</Text>
        <IconButton
          variant='ghost'
          aria-label='Next page'
          icon={<IoIosArrowForward />}
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
          isDisabled={isLastPage}
        />
      </Flex>
    </Flex>
  )
}
