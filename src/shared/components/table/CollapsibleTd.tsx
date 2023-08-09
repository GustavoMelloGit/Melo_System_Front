import { Collapse, Td, type TableCellProps } from '@chakra-ui/react'
import { useMemo, useState, type ReactNode } from 'react'

type Props = TableCellProps & {
  children: ReactNode | ((props: { isCollapsed: boolean }) => JSX.Element)
}
export default function CollapsibleTd({ children, ...rest }: Props): JSX.Element {
  const [showText, setShowText] = useState<boolean>(false)

  const childElement = useMemo(() => {
    if (typeof children === 'function') {
      return children({ isCollapsed: showText })
    }
    return children
  }, [showText])

  return (
    <Td
      title={typeof children === 'string' ? children : undefined}
      cursor='pointer'
      onClick={() => {
        setShowText((prev) => !prev)
      }}
      maxW={80}
      wordBreak='break-word'
      whiteSpace='pre-wrap'
      {...rest}
    >
      <Collapse startingHeight={20} in={showText}>
        {childElement}
      </Collapse>
    </Td>
  )
}
