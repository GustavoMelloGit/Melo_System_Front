import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'

type Props = RouterLinkProps & ChakraLinkProps
const Link = forwardRef<HTMLAnchorElement, Props>((props, ref): JSX.Element => {
  return (
    <ChakraLink ref={ref} as={RouterLink} {...props}>
      {props.children}
    </ChakraLink>
  )
})
export default Link
