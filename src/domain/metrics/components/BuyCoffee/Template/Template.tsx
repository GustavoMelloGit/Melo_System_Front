import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { capitalCase } from 'change-case'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type BuyCoffeeMetric } from '../../../types/coffeePriceMetrics'

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
  data: BuyCoffeeMetric[]
}
export default function BuyCoffeeMetricsTemplate({ data }: Props): JSX.Element {
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
          Compras de café
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
          <PDFTableRowItem
            style={{
              maxWidth: 80,
            }}
          >
            <Text>Tipo de Café</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Valor</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Quantidade</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow key={metric.type} wrap={false}>
              <PDFTableRowItem>
                <Text>{capitalCase(metric.type)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatCurrency(metric.value)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{getNumberOfBags(metric.weight)}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
          <PDFTableRow>
            <PDFTableRowItem>
              <Text>TOTAL</Text>
            </PDFTableRowItem>
            <PDFTableRowItem>
              <Text>{formatCurrency(data.reduce((acc, curr) => acc + curr.value, 0))}</Text>
            </PDFTableRowItem>
            <PDFTableRowItem>
              <Text>{getNumberOfBags(data.reduce((acc, curr) => acc + curr.weight, 0))}</Text>
            </PDFTableRowItem>
          </PDFTableRow>
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
