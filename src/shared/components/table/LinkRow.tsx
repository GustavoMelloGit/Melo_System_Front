import { LinkBox, LinkOverlay, Td, Tr, VisuallyHidden, type LinkBoxProps } from '@chakra-ui/react'
import Link from '../Link'

type Props = LinkBoxProps & {
  to: string
  descriptiveLinkText: string
}
export default function LinkRow({
  children,
  to,
  descriptiveLinkText,
  ...rest
}: Props): JSX.Element {
  return (
    <LinkBox as={Tr} transform='scale(1)' {...rest}>
      {children}
      <Td
        visibility='hidden'
        sx={{
          all: 'unset',
        }}
      >
        <LinkOverlay as={Link} to={to}>
          <VisuallyHidden>{descriptiveLinkText}</VisuallyHidden>
        </LinkOverlay>
      </Td>
    </LinkBox>
  )
}
