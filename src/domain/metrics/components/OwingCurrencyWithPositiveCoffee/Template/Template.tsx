import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { formatClientName, formatCurrency } from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import PDFContainer from '../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../shared/components/PDF/styles'
import { type OwingCurrencyWithPositiveCoffeeClient } from '../../../types/owingCurrencyWithPositiveCoffee'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})

function getCoffeeBalance(client: OwingCurrencyWithPositiveCoffeeClient): number {
  if (client.coffeeBalance !== undefined) return client.coffeeBalance
  if (client.coffeeWeight !== undefined) return client.coffeeWeight
  return client.balances?.coffee ?? 0
}

type Props = {
  data: OwingCurrencyWithPositiveCoffeeClient[]
}

export default function OwingCurrencyWithPositiveCoffeeMetricsTemplate({
  data,
}: Props): JSX.Element {
  const totalCurrency = data.reduce((acc, curr) => acc + curr.balance, 0)
  const totalCoffee = data.reduce((acc, curr) => acc + getCoffeeBalance(curr), 0)

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
          Devendo na conta corrente com saldo café positivo
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
            <Text>Saldo conta corrente</Text>
          </PDFTableRowItem>
          <PDFTableRowItem>
            <Text>Saldo café</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {data.map((client) => (
            <PDFTableRow key={client.id} wrap={false}>
              <PDFTableRowItem>
                <Text>{client.code}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatClientName(client)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{formatCurrency(client.balance)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem>
                <Text>{getNumberOfBags(getCoffeeBalance(client))}</Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
          <PDFTableRow>
            <PDFTableRowItem>
              <Text>TOTAL</Text>
            </PDFTableRowItem>
            <PDFTableRowItem></PDFTableRowItem>
            <PDFTableRowItem>
              <Text>{formatCurrency(totalCurrency)}</Text>
            </PDFTableRowItem>
            <PDFTableRowItem>
              <Text>{getNumberOfBags(totalCoffee)}</Text>
            </PDFTableRowItem>
          </PDFTableRow>
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
