import { Collapse, Td, type TableCellProps } from '@chakra-ui/react'
import { useState } from 'react'

type Props = TableCellProps
export default function CollapsibleTd({ children, ...rest }: Props): JSX.Element {
  const [showText, setShowText] = useState<boolean>(false)
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
        {children}
      </Collapse>
    </Td>
  )
}
