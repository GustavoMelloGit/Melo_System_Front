import { StyleSheet, Text, View } from '@react-pdf/renderer'
import PDFPaddingElement from '../../../../../shared/components/PDF/PDFPaddingElement'
import { boldText } from '../../../../../shared/components/PDF/styles'

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
  title: string
}
export default function AccountTemplateHeader({ title }: Props): JSX.Element {
  return (
    <>
      <PDFPaddingElement />

      <View style={styles.header}>
        <Text
          style={{
            ...boldText,
            fontSize: 16,
          }}
        >
          {title}
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
    </>
  )
}
