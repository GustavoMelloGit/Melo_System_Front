import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

export default function PDFTable({ children }: PropsWithChildren): JSX.Element {
  return (
    <View
      style={{
        width: '100%',
      }}
    >
      {children}
    </View>
  )
}
