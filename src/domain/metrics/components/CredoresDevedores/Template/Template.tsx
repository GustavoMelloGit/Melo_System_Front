import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { centsToCurrency, formatCurrency } from '../../../../../lib/utils/formatters'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type ClientModel } from '../../../../client/types/model/Client'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})

type Props = {
  data: ClientModel[]
}
export default function CredoresDevedoresMetricsTemplate({ data }: Props): JSX.Element {
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
          Credores e Devedores
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
            <Text>Código</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Cliente</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Córrego</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Saldo</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow key={metric.id} wrap={false}>
              <PDFTableRowItem>
                <Text>{metric.code}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.name}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.address?.brook}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatCurrency(centsToCurrency(metric.balance))}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
          <PDFTableRow>
            <PDFTableRowItem>
              <Text>TOTAL</Text>
            </PDFTableRowItem>
            <PDFTableRowItem></PDFTableRowItem>
            <PDFTableRowItem></PDFTableRowItem>
            <PDFTableRowItem>
              <Text>
                {formatCurrency(centsToCurrency(data.reduce((acc, curr) => acc + curr.balance, 0)))}
              </Text>
            </PDFTableRowItem>
          </PDFTableRow>
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
