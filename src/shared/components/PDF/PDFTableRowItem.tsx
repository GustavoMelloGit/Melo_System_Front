import type ReactPDF from '@react-pdf/renderer'
import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

type Props = ReactPDF.ViewProps & PropsWithChildren
export default function PDFTableRowItem({ children, style, ...rest }: Props): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        padding: '5px 0',
        ...style,
      }}
      {...rest}
    >
      {children}
    </View>
  )
}
