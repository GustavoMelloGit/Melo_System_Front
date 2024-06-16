import { View, type ViewProps } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

type Props = ViewProps & PropsWithChildren
export default function PDFTableRowItem({ children, style, ...rest }: Props): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        padding: '3px 5px',
        ...style,
      }}
      {...rest}
    >
      {children}
    </View>
  )
}
