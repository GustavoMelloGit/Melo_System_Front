import { LinkBox, LinkOverlay, Tr, type LinkBoxProps } from '@chakra-ui/react'
import Link, { type Props as LinkProps } from '../Link'

type Props = LinkBoxProps
export default function LinkRow({ children, ...rest }: Props): JSX.Element {
  return (
    <LinkBox as={Tr} transform='scale(1)' {...rest}>
      {children}
    </LinkBox>
  )
}

function LinkRowLink({ children, ...props }: LinkProps): JSX.Element {
  return (
    <LinkOverlay as={Link} {...props} _hover={{ textDecor: 'none', ...props.sx }}>
      {children}
    </LinkOverlay>
  )
}

LinkRow.Link = LinkRowLink
