import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { centsToCurrency, formatCurrency } from '../../../../../../../../lib/utils/formatters'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../../../../shared/components/PDF/styles'
import { type CurrencyTransactionModel } from '../../../../../../types/model/Transaction'

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
  data: CurrencyTransactionModel[]
}
export default function DownloadCheckingAccountTemplate({ data }: Props): JSX.Element {
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
          Movimentações Conta Corrente
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
          <PDFTableRowItem style={{ maxWidth: 60 }}>
            <Text>Data</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Descrição</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 80 }}>
            <Text>Valor</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 80 }}>
            <Text>Saldo</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow key={metric.id} wrap={false}>
              <PDFTableRowItem style={{ maxWidth: 60 }}>
                <Text>{format(metric.date, 'dd/MM/yyyy')}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.description}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem style={{ maxWidth: 80 }}>
                <Text>{formatCurrency(centsToCurrency(metric.type.value))}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem style={{ maxWidth: 80 }}>
                <Text>{formatCurrency(centsToCurrency(metric.clientBalance))}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
