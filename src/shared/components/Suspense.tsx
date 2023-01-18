import { Center, Heading } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export default function Suspense({ children }: PropsWithChildren): JSX.Element {
  return <React.Suspense fallback={<SuspenseLoader />}>{children}</React.Suspense>
}

function SuspenseLoader(): JSX.Element {
  return (
    <Center minH='100vh' minW='100vw'>
      <Heading as='h1'>Carregando...</Heading>
    </Center>
  )
}
