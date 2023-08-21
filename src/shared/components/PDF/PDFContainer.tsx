import { Document, Page, View } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

export default function PDFContainer({ children }: PropsWithChildren): JSX.Element {
  return (
    <Document>
      <Page size='A4'>
        <View
          style={{
            width: '100%',
            padding: '0 50px',
            maxWidth: '29cm',
            margin: '0 auto',
            fontSize: 8,
          }}
        >
          {children}
        </View>
      </Page>
    </Document>
  )
}
