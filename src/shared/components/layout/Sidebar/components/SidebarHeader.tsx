import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { GoSignOut } from 'react-icons/go'
import useAuth from '../../../../../domain/auth/hooks/useAuth'
import useLayoutContext from '../../../../hooks/useLayoutContext'
import ToggleSidebarButton from '../../../buttons/ToggleSidebarButton'

export default function SidebarHeader(): JSX.Element {
  const { signOut } = useAuth()
  const {
    sidebar: { isOpen },
  } = useLayoutContext()
  return (
    <VStack align='stretch' as='header'>
      {isOpen && <ToggleSidebarButton alignSelf='flex-end' />}
      <Flex align='center' gap={4}>
        <VStack align='flex-start' w='full'>
          <Heading noOfLines={1} as='h1' fontSize='md'>
            test@test.com
          </Heading>
          <Button variant='outline' size='sm' onClick={signOut} gap={2} lineHeight={0.5}>
            <GoSignOut />
            Sair
          </Button>
        </VStack>
      </Flex>
    </VStack>
  )
}
