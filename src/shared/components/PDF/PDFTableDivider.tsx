import type ReactPDF from '@react-pdf/renderer'
import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'
import { boldText } from './styles'

type Props = ReactPDF.ViewProps & PropsWithChildren
export default function PDFTableDivider({ children, style, ...rest }: Props): JSX.Element {
  return (
    <View
      style={{
        borderBottom: '1px solid black',
        backgroundColor: '#C0C0C0',
        padding: '5px 3px',
        ...boldText,
        ...style,
      }}
      {...rest}
    >
      {children}
    </View>
  )
}
