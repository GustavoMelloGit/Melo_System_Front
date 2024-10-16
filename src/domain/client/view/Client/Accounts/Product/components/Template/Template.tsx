import { Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import AccountTemplateHeader from '../../../../../../components/Client/Template/AccountTemplateHeader'
import { type ProductTransactionModel } from '../../../../../../types/model/Transaction'

type Props = {
  data: ProductTransactionModel[]
}
export default function DownloadProductAccountTemplate({ data }: Props): JSX.Element {
  return (
    <PDFContainer>
      <AccountTemplateHeader title='Movimentações Conta Adubo' />

      <PDFTable>
        <PDFTableHeader>
          <PDFTableRowItem style={{ maxWidth: 60 }}>
            <Text>Data</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Descrição</Text>
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
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
