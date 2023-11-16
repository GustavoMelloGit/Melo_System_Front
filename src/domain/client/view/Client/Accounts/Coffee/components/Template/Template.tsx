import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../../../../shared/components/PDF/styles'
import {
  CoffeeBebidasLabel,
  type CoffeeTypes,
} from '../../../../../../../coffee/types/model/coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getFullDescriptionFromCoffeeTransaction } from '../../utils/getFullDescriptionFromCoffeeTransaction'

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
  data: CoffeeTransactionModel[]
}
export default function DownloadCoffeeAccountTemplate({ data }: Props): JSX.Element {
  const labelByTypeName: Record<CoffeeTypes, string> = {
    bica_corrida: 'BC',
    conilon: 'CON',
    despolpado: 'DESP',
    escolha: 'ESC',
  }

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
          Movimentações Conta Café
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
          <PDFTableRowItem style={{ maxWidth: 60 }}>
            <Text>Tipo</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 60 }}>
            <Text>Bebida</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Descrição</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 60 }}>
            <Text>Pesagem</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 60 }}>
            <Text>Saldo</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((metric) => {
            const fullDescription: string = getFullDescriptionFromCoffeeTransaction(metric)
            const coffeeTypeColumnValue: string = metric.details
              ? labelByTypeName[metric.details.coffeeType]
              : '--'

            return (
              <PDFTableRow key={metric.id} wrap={false}>
                <PDFTableRowItem style={{ maxWidth: 60 }}>
                  <Text>{dateToFormat(metric.date)}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem style={{ maxWidth: 60 }}>
                  <Text>{coffeeTypeColumnValue}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem style={{ maxWidth: 60 }}>
                  <Text>{CoffeeBebidasLabel[metric.type.name]}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem>
                  <Text>{fullDescription}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem style={{ maxWidth: 60 }}>
                  <Text>{getNumberOfBags(metric.type.value)}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem style={{ maxWidth: 60 }}>
                  <Text>{getNumberOfBags(metric.clientBalance)}</Text>
                </PDFTableRowItem>
              </PDFTableRow>
            )
          })}
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
