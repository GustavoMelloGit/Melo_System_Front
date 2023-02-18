import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  type InputProps,
} from '@chakra-ui/react'

type CurrencyInputProps = Omit<InputProps, 'value'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  setValue: (value: number) => void
  value: number
}
export default function CurrencyInput({
  leftIcon,
  rightIcon,
  label,
  setValue,
  value,
  ...props
}: CurrencyInputProps): JSX.Element {
  function formatCurrency(value: string): string {
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100)

    if (result === 'NaN') {
      return '0,00'
    }
    if (typeof result === 'string') {
      return result
    }
    return ''
  }

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
        <Input
          variant='filled'
          rounded='xl'
          inputMode='numeric'
          fontWeight={500}
          value={formatCurrency(String(value * 100))}
          onChange={async (event) => {
            const { value } = event.target
            const onlyNumbers = value.replace('.', '').replace(',', '').replace(/\D/g, '')
            setValue(+onlyNumbers / 100)
          }}
          {...props}
        />
        {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
      </InputGroup>
    </FormControl>
  )
}
