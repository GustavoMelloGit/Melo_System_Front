import { Collapse, Td, type TableCellProps } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

type Props = Omit<TableCellProps, 'children'> & {
  children: ReactNode | ((props: { isCollapsed: boolean }) => ReactNode)
}
export default function CollapsibleTd({ children, ...rest }: Props): JSX.Element {
  const [showText, setShowText] = useState<boolean>(false)

  const toggleShowText = useCallback(() => {
    setShowText((prev) => !prev)
  }, [setShowText])

  const commandListenerHandler = useCallback(
    (e: KeyboardEvent) => {
      const isShortcut = e.ctrlKey && e.code === 'KeyO'
      if (isShortcut) toggleShowText()
    },
    [toggleShowText],
  )

  useEffect(() => {
    window.addEventListener('keydown', commandListenerHandler)

    return () => {
      window.removeEventListener('keydown', commandListenerHandler)
    }
  }, [])

  const childElement = useMemo(() => {
    if (typeof children === 'function') {
      return children({ isCollapsed: showText })
    }
    return children
  }, [showText, children])

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
