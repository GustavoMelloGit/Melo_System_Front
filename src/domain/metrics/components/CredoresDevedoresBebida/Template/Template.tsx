import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { capitalCase } from 'change-case'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type CreditorsAndDebtorsBebidaMetric } from '../../../types/creditorsAndDebtorsBebidaMetrics'

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
  data: CreditorsAndDebtorsBebidaMetric[]
}
export default function CredoresDevedoresBebidaMetricsTemplate({ data }: Props): JSX.Element {
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
          Credores e Devedores de Café
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
            <Text>Bebida</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Saldo</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow
              key={`${metric.id}-${metric.balance.type}-${metric.balance.total}`}
              wrap={false}
            >
              <PDFTableRowItem>
                <Text>{metric.code}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.name}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{capitalCase(metric.balance.type)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{getNumberOfBags(metric.balance.total)}</Text>
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
                {getNumberOfBags(data.reduce((acc, curr) => acc + curr.balance.total, 0))}
              </Text>
            </PDFTableRowItem>
          </PDFTableRow>
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
