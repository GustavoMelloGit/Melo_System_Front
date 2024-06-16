import { Box, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import AuthImage from '../../../../lib/assets/auth-image.jpg'
import SignInForm from '../../components/SignInForm'
import useSignInView from './useView'

export default function SignInView(): JSX.Element {
  const { signIn } = useSignInView()
  return (
    <Flex minW='100vw' minH='100vh' flexDir={{ base: 'column', md: 'row' }} data-cy='login-page'>
      <Center flex={1}>
        <VStack spacing={6} px={8} align='stretch' w={['full', '400px']}>
          <VStack>
            <Heading as='h1' textAlign='center'>
              Melo System
            </Heading>
            <Heading as='h2' fontWeight={300} size='md' textAlign='center'>
              Por favor, faça login para continuar
            </Heading>
          </VStack>
          <SignInForm onSubmit={signIn} />
        </VStack>
      </Center>
      <Box
        borderLeftRadius={[0, 50]}
        flex={1}
        bg={`url(${AuthImage})`}
        bgSize='cover'
        bgPosition='center'
      />
    </Flex>
  )
}
