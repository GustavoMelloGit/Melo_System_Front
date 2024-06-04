import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { getNumberOfBags } from '../../../../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../../../../shared/components/PDF/styles'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { parseEscolhaTransactionDescription } from '../../utils/parsers'

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
  data: EscolhaTransactionModel[]
}
export default function DownloadEscolhaAccountTemplate({ data }: Props): JSX.Element {
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
          Movimentações Conta Escolha
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
