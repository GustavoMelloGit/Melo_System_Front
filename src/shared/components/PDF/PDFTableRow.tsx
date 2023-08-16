import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

export default function PDFTableRow({ children }: PropsWithChildren): JSX.Element {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1pt solid black',
      }}
    >
      {children}
    </View>
  )
}
