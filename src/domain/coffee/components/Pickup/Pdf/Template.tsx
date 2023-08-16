import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { Fragment } from 'react'
import { type PickupPDFData } from './types'

const rowItem = {
  flex: 1,
  padding: '5px 0',
} as const
const row = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: '1pt solid black',
} as const
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
  row,
  rowItem,
  rowItemCentered: {
    ...rowItem,
    textAlign: 'center',
  },
  table: {
    width: '100%',
    marginTop: 10,
  },
  brookDivider: {
    borderBottom: '1px solid black',
    backgroundColor: '#C0C0C0',
    padding: '5px 3px',
    ...boldText,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableHeader: {
    ...row,
    ...boldText,
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
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.rowItem}>Cliente</Text>
              <Text
                style={{
                  ...styles.rowItemCentered,
                  maxWidth: 70,
                }}
              >
                Sacos
              </Text>
              <Text style={styles.rowItem}>Referência</Text>
            </View>
            {Object.entries(data).map(([brook, data]) => (
              <Fragment key={brook}>
                <View style={styles.brookDivider}>
                  <Text style={{ fontWeight: 700 }}>{brook}</Text>
                </View>

                {data.map((order) => (
                  <View key={order.id} style={styles.row}>
                    <Text style={styles.rowItem}>{order.client}</Text>
                    <Text
                      style={{
                        ...styles.rowItemCentered,
                        maxWidth: 70,
                      }}
                    >
                      {order.bags}
                    </Text>
                    <Text style={styles.rowItem}>{order.address}</Text>
                  </View>
                ))}
              </Fragment>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}
