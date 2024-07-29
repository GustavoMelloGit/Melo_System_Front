import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { capitalCase } from 'change-case'
import { format } from 'date-fns'
import {
  centsToCurrency,
  formatClientName,
  formatCurrency,
} from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type CoffeePriceMetrics } from '../../../types/buyCoffeeMetrics'

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
  data: CoffeePriceMetrics[]
}
export default function CoffeePriceMetricsTemplate({ data }: Props): JSX.Element {
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
          Preço de Café
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
            <Text>Data</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Nome do Cliente</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Tipo de Café</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Bebida</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Valor P/ Saca</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Sacas</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow key={metric._id} wrap={false}>
              <PDFTableRowItem>
                <Text>{format(metric.date, 'dd/MM/yyyy')}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatClientName(metric.client)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{capitalCase(metric.coffeeType)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{capitalCase(metric.bebida)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatCurrency(centsToCurrency(metric.valuePerBag))}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{getNumberOfBags(metric.weight)}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
