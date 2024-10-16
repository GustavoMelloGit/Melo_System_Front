import { Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { getNumberOfBags } from '../../../../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import AccountTemplateHeader from '../../../../../../components/Client/Template/AccountTemplateHeader'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { parseEscolhaTransactionDescription } from '../../utils/parsers'

type Props = {
  data: EscolhaTransactionModel[]
}
export default function DownloadEscolhaAccountTemplate({ data }: Props): JSX.Element {
  return (
    <PDFContainer>
      <AccountTemplateHeader title='Movimentações Conta Escolha' />

      <PDFTable>
        <PDFTableHeader>
          <PDFTableRowItem>
            <Text>Data</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Descrição</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Aproveitamento</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Impureza</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Pesagem</Text>
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
                <Text>{parseEscolhaTransactionDescription(metric)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.details.utilization ?? 0}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{metric.details.foulness ?? 0}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{getNumberOfBags(metric.type.value)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{getNumberOfBags(metric.clientBalance)}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
