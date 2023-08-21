import { StyleSheet, Text, View } from '@react-pdf/renderer'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableDivider from '../../../../../shared/components/PDF/PDFTableDivider'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type PickupPDFData } from './types'

const styles = StyleSheet.create({
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
    <PDFContainer>
      <PDFPaddingElement />
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
          <View key={brook}>
            <PDFTableDivider>
              <Text>{brook}</Text>
            </PDFTableDivider>

            {data.map((order) => (
              <PDFTableRow key={order.id} wrap={false}>
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
          </View>
        ))}
      </PDFTable>
    </PDFContainer>
  )
}
