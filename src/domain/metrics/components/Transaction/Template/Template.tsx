import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { formatClientName } from '../../../../../lib/utils/formatters'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { formatterByTransactionTypeName } from '../../../constants/formatterByTransactionTypeName'
import { labelByTransactionTypeName } from '../../../constants/labelByTransactionTypeName'
import { type TransactionMetrics } from '../../../types/transactionMetrics'

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
  data: TransactionMetrics[]
}
export default function TransactionsMetricsTemplate({ data }: Props): JSX.Element {
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
          Transações do Sistema
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
            <Text>Conta</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Valor</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => (
            <PDFTableRow key={metric.id} wrap={false}>
              <PDFTableRowItem>
                <Text>{format(metric.props.date, 'dd/MM/yyyy')}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatClientName(metric.props.client)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{labelByTransactionTypeName[metric.props.type.name]}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>
                  {formatterByTransactionTypeName[metric.props.type.name]?.(
                    metric.props.type.value,
                  )}
                </Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
