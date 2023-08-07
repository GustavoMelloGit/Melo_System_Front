import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'

type Props = RouterLinkProps & ChakraLinkProps
export default function Link(props: Props): JSX.Element {
  return (
    <ChakraLink as={RouterLink} {...props}>
      {props.children}
    </ChakraLink>
  )
}
