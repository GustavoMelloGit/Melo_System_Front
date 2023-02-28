import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  type InputProps,
} from '@chakra-ui/react'
import { useState } from 'react'

type CurrencyInputProps = Omit<InputProps, 'value'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  initialValue?: number
  setValue?: (value: number) => void
}
export default function CurrencyInput({
  leftIcon,
  rightIcon,
  label,
  setValue,
  initialValue = 0,
  ...props
}: CurrencyInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState<number>(initialValue)

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
          value={formatCurrency(String(inputValue * 100))}
          onChange={async (event) => {
            const { value } = event.target
            const onlyNumbers = value.replace('.', '').replace(',', '').replace(/\D/g, '')
            setInputValue(Number(onlyNumbers) / 100)
            setValue?.(+onlyNumbers / 100)
          }}
          {...props}
        />
        {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
      </InputGroup>
    </FormControl>
  )
}
