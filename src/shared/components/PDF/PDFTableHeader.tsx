import { View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'
import { boldText } from './styles'

export default function PDFTableHeader({ children }: PropsWithChildren): JSX.Element {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1pt solid black',
        ...boldText,
      }}
    >
      {children}
    </View>
  )
}
