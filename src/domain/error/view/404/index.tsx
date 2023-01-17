import { Box, Button, Center, Heading, Image, VStack } from '@chakra-ui/react'
import PageLayout from '../../../../shared/components/layout'
import ImageTest from '../../assets/lost-image.svg'
import useNotFoundPage from './useView'

export default function NotFoundPage(): JSX.Element {
  const { handleGoHome } = useNotFoundPage()
  return (
    <PageLayout>
      <Center flex={1}>
        <VStack spacing={8}>
          <Box>
            <Image src={ImageTest} alt='404 page not found' boxSize={320} />
            <Heading as='h2' fontSize='3xl'>
              Página não encontrada
            </Heading>
          </Box>
          <Button w='full' onClick={handleGoHome}>
            Voltar
          </Button>
        </VStack>
      </Center>
    </PageLayout>
  )
}
