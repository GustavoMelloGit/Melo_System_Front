import { Flex, IconButton, VStack } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import ListTransactionsView from './List'

export default function CheckingAccount(): JSX.Element {
  return (
    <VStack spacing={4}>
      <Flex w='full' justify='flex-end'>
        <IconButton
          aria-label='Criar cliente'
          icon={<IoAddOutline size={22} />}
          colorScheme='blue'
          variant='outline'
        />
      </Flex>
      <ListTransactionsView />
    </VStack>
  )
}
