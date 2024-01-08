import { Center, Spinner, type SpinnerProps } from '@chakra-ui/react'

export default function SpinLoader(props: SpinnerProps): JSX.Element {
  return (
    <Center>
      <Spinner {...props} />
    </Center>
  )
}
