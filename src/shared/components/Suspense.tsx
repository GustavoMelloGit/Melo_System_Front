import { Center } from '@chakra-ui/react'
import React, { type PropsWithChildren } from 'react'
import SpinLoader from './SpinLoader'

export default function Suspense({ children }: PropsWithChildren): JSX.Element {
  return <React.Suspense fallback={<SuspenseLoader />}>{children}</React.Suspense>
}

export function SuspenseLoader(): JSX.Element {
  return (
    <Center flex={1}>
      <Center boxSize={120} bg='gray.700' rounded={25} shadow='xl'>
        <SpinLoader size='lg' />
      </Center>
    </Center>
  )
}
