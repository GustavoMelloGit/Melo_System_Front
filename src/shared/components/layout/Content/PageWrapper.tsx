import { VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function PageWrapper({ children }: PropsWithChildren): JSX.Element {
  return (
    <VStack align='stretch' spacing={10}>
      {children}
    </VStack>
  )
}
