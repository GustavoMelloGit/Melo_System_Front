import { Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { formatCurrency } from '../../../../../../../../lib/utils/formatters'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import AccountTemplateHeader from '../../../../../../components/Client/Template/AccountTemplateHeader'
import { type CurrencyTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  data: CurrencyTransactionModel[]
}
export default function DownloadCheckingAccountTemplate({ data }: Props): JSX.Element {
  return (
    <PDFContainer>
      <AccountTemplateHeader title='Movimentações Conta Corrente' />
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
                <Text>{formatCurrency(metric.type.value)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem style={{ maxWidth: 80 }}>
                <Text>{formatCurrency(metric.clientBalance)}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
