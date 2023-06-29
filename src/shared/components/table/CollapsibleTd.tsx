import { Collapse, Td } from '@chakra-ui/react'
import { useState, type PropsWithChildren } from 'react'

export default function CollapsibleTd({ children }: PropsWithChildren): JSX.Element {
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
    >
      <Collapse startingHeight={20} in={showText}>
        {children}
      </Collapse>
    </Td>
  )
}
