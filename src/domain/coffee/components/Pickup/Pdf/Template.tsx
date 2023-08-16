import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { Fragment } from 'react'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableDivider from '../../../../../shared/components/PDF/PDFTableDivider'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { type PickupPDFData } from './types'

const boldText = {
  fontFamily: 'Helvetica-Bold',
} as const
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '20px 50px',
    maxWidth: '29cm',
    margin: '0 auto',
    fontSize: 8,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

type Props = {
  data: PickupPDFData
}
export default function PickupPDFTemplate({ data }: Props): JSX.Element {
  return (
    <Document>
      <Page size='A4'>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                ...boldText,
                fontSize: 16,
              }}
            >
              Cafés a Buscar
            </Text>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              {new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              })}
            </Text>
          </View>
          <PDFTable>
            <PDFTableHeader>
              <PDFTableRowItem>
                <Text>Cliente</Text>
              </PDFTableRowItem>
              <PDFTableRowItem
                style={{
                  maxWidth: 70,
                  textAlign: 'center',
                }}
              >
                <Text>Sacos</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>Referência</Text>
              </PDFTableRowItem>
            </PDFTableHeader>
            {Object.entries(data).map(([brook, data]) => (
              <Fragment key={brook}>
                <PDFTableDivider>
                  <Text>{brook}</Text>
                </PDFTableDivider>

                {data.map((order) => (
                  <PDFTableRow key={order.id}>
                    <PDFTableRowItem>
                      <Text>{order.client}</Text>
                    </PDFTableRowItem>
                    <PDFTableRowItem
                      style={{
                        maxWidth: 70,
                        textAlign: 'center',
                      }}
                    >
                      <Text>{order.bags}</Text>
                    </PDFTableRowItem>
                    <PDFTableRowItem>
                      <Text>{order.address}</Text>
                    </PDFTableRowItem>
                  </PDFTableRow>
                ))}
              </Fragment>
            ))}
          </PDFTable>
        </View>
      </Page>
    </Document>
  )
}
