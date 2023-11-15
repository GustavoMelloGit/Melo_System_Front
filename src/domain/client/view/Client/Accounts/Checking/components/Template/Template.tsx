import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import {
  currencyValueCorrection,
  formatCurrency,
} from '../../../../../../../../lib/utils/formatters'
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
            <Text>Descrição</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Valor</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Saldo</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow key={metric.id} wrap={false}>
              <PDFTableRowItem>
                <Text>{format(metric.date, 'dd/MM/yyyy')}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.description}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatCurrency(metric.type.value)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{currencyValueCorrection(metric.clientBalance)}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
