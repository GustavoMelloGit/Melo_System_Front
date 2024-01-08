import type ReactPDF from '@react-pdf/renderer'
import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

type Props = ReactPDF.ViewProps & PropsWithChildren
export default function PDFTableRow({ children, ...rest }: Props): JSX.Element {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1pt solid black',
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </View>
  )
}
