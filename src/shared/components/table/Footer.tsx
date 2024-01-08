import { Tfoot, type TableFooterProps } from '@chakra-ui/react'

export default function TableFooter({ children, ...rest }: TableFooterProps): JSX.Element {
  return <Tfoot {...rest}>{children}</Tfoot>
}
