import { LinkBox, LinkOverlay, Td, Tr, type LinkBoxProps } from '@chakra-ui/react'
import Link from '../Link'

type Props = LinkBoxProps & {
  to: string
}
export default function LinkRow({ children, to, ...rest }: Props): JSX.Element {
  return (
    <LinkBox as={Tr} {...rest}>
      {children}
      <Td
        visibility='hidden'
        sx={{
          all: 'unset',
        }}
      >
        <LinkOverlay
          as={Link}
          to={to}
          _before={{
            border: '1px solid red',
          }}
        />
      </Td>
    </LinkBox>
  )
}
