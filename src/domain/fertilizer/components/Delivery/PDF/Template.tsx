import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { Fragment } from 'react'
import { formatClientName } from '../../../../../lib/utils/formatters'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableDivider from '../../../../../shared/components/PDF/PDFTableDivider'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type FertilizerDeliveryPDFData } from './types'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

type Props = {
  data: FertilizerDeliveryPDFData
}
export default function FertilizerDeliveryTemplate({ data }: Props): JSX.Element {
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
          Produtos a entregar
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
          <PDFTableRowItem
            style={{
              maxWidth: 80,
            }}
          >
            <Text>Data de Entrega</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Cliente</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Adubo</Text>
          </PDFTableRowItem>
          <PDFTableRowItem
            style={{
              maxWidth: 70,
              textAlign: 'center',
            }}
          >
            <Text>Quantidade</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Complemento</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        {Object.entries(data).map(([brook, data]) => (
          <Fragment key={brook}>
            <PDFTableDivider>
              <Text>{brook}</Text>
            </PDFTableDivider>

            {data.map((order) => (
              <PDFTableRow wrap={false} key={order.id}>
                <PDFTableRowItem
                  style={{
                    maxWidth: 80,
                  }}
                >
                  <Text>{format(order.date, 'dd/MM/yyyy')}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem>
                  <Text>{formatClientName(order.client)}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem>
                  <Text>{order.fertilizer.name}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem
                  style={{
                    maxWidth: 70,
                    textAlign: 'center',
                  }}
                >
                  <Text>{order.amount}</Text>
                </PDFTableRowItem>
                <PDFTableRowItem>
                  <Text>{order.complement}</Text>
                </PDFTableRowItem>
              </PDFTableRow>
            ))}
          </Fragment>
        ))}
      </PDFTable>
    </PDFContainer>
  )
}
