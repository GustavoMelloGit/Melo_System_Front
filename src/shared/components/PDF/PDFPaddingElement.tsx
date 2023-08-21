import type ReactPDF from '@react-pdf/renderer'
import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

type Props = ReactPDF.ViewProps &
  PropsWithChildren & {
    padding?: number
  }
export default function PDFPaddingElement({ children, padding = 20, ...rest }: Props): JSX.Element {
  return (
    <View
      fixed
      style={{
        height: padding,
        width: '100%',
        ...rest.style,
      }}
      {...rest}
    />
  )
}
