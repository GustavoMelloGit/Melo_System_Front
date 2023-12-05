import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import { formatAddress, formatCurrency } from '../../../../../../../../lib/utils/formatters'
import Logo from '../../../../../../../../shared/assets/logo.png'
import PDFContainer from '../../../../../../../../shared/components/PDF/PDFContainer'
import PDFPaddingElement from '../../../../../../../../shared/components/PDF/PDFPaddingElement'
import PDFTable from '../../../../../../../../shared/components/PDF/PDFTable'
import PDFTableHeader from '../../../../../../../../shared/components/PDF/PDFTableHeader'
import PDFTableRow from '../../../../../../../../shared/components/PDF/PDFTableRow'
import PDFTableRowItem from '../../../../../../../../shared/components/PDF/PDFTableRowItem'
import { boldText } from '../../../../../../../../shared/components/PDF/styles'
import { type ClientModel } from '../../../../../../types/model/Client'
import { type ProductTransactionSaleModel } from '../../../../../../types/model/Transaction'

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
  sales: ProductTransactionSaleModel
  client: ClientModel
  saleDate: number
}
export default function DownloadSaleTemplate({ client, saleDate, sales }: Props): JSX.Element {
  const totalizers = sales.reduce(
    (acc, curr) => {
      return {
        items: acc.items + 1,
        quantity: acc.quantity + curr.bags,
        total: acc.total + curr.bags * curr.pricePerBag,
      }
    },
    {
      items: 0,
      quantity: 0,
      total: 0,
    },
  )
  return (
    <PDFContainer>
      <PDFPaddingElement />
      <View style={styles.header}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Image
            src={Logo}
            style={{
              width: 60,
            }}
          />
          <View>
            <Text
              style={{
                ...boldText,
                fontSize: 10,
              }}
            >
              E F Armazens Gerais
            </Text>
            <Text
              style={{
                fontSize: 8,
              }}
            >
              AV. PROFESSORA EUNICE DE SOUZA GONÇALVES: DIVINO
            </Text>
            <Text
              style={{
                ...boldText,
                fontSize: 12,
                textDecoration: 'underline',
              }}
            >
              RECIBO DE VENDA
            </Text>
            <Text
              style={{
                fontSize: 7,
                marginTop: 2,
              }}
            >
              Impresso em:{' '}
              {new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              })}
              {'. '}
              Realizada em:{' '}
              {new Date(saleDate).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              })}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 10,
            }}
          >
            07.624.001/0001-56
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderTop: '1px solid black',
          borderBottom: '1px solid black',
          paddingVertical: 5,
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textTransform: 'uppercase', ...boldText }}>Cliente: {client.name}</Text>
          <Text>
            CPF / CNPJ:{' '}
            {client.personType.type === 'fisica'
              ? client.personType.cpf
              : client.personType.type === 'juridica'
              ? client.personType.cnpj
              : '--.---.------'}
          </Text>
        </View>
        <Text>Endereço: {formatAddress(client.address)}</Text>
      </View>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          marginVertical: 3,
          ...boldText,
        }}
      >
        ** ITENS VENDIDOS **
      </Text>
      <PDFTable>
        <PDFTableHeader>
          <PDFTableRowItem>
            <Text>Descrição</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 80 }}>
            <Text>Quantidade</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 80 }}>
            <Text>Valor Unit.</Text>
          </PDFTableRowItem>
          <PDFTableRowItem style={{ maxWidth: 80 }}>
            <Text>Total</Text>
          </PDFTableRowItem>
        </PDFTableHeader>
        <View>
          {sales.map((sale, index) => (
            <PDFTableRow
              key={`${sale.fertilizerId}${sale.bags}`}
              style={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff',
              }}
              wrap={false}
            >
              <PDFTableRowItem>
                <Text>
                  {sale.fertilizerName} {sale.fertilizerDescription}
                </Text>
              </PDFTableRowItem>
              <PDFTableRowItem style={{ maxWidth: 80 }}>
                <Text style={{ textAlign: 'right' }}>{sale.bags}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem style={{ maxWidth: 80 }}>
                <Text style={{ textAlign: 'right' }}>{formatCurrency(sale.pricePerBag)}</Text>
              </PDFTableRowItem>
              <PDFTableRowItem style={{ maxWidth: 80 }}>
                <Text style={{ textAlign: 'right' }}>
                  {formatCurrency(sale.pricePerBag * sale.bags)}
                </Text>
              </PDFTableRowItem>
            </PDFTableRow>
          ))}
          <PDFTableRow wrap={false}>
            <PDFTableRowItem>
              <Text style={boldText}>ITENS: {totalizers.items}</Text>
            </PDFTableRowItem>
            <PDFTableRowItem style={{ maxWidth: 80 }}>
              <Text style={{ textAlign: 'right', ...boldText }}>QTD: {totalizers.quantity}</Text>
            </PDFTableRowItem>
            <PDFTableRowItem style={{ maxWidth: 80 }}></PDFTableRowItem>
            <PDFTableRowItem style={{ maxWidth: 80 }}>
              <Text style={{ textAlign: 'right', ...boldText }}>
                TOTAL: {formatCurrency(totalizers.total)}
              </Text>
            </PDFTableRowItem>
          </PDFTableRow>
        </View>
      </PDFTable>
    </PDFContainer>
  )
}
