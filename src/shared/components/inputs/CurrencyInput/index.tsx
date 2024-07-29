import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  type InputProps,
} from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { Currency } from '../../../../lib/utils/Currency'

type CurrencyInputProps = Omit<InputProps, 'value'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  initialValue?: number
  setValue?: (value: number) => void
}
const CurrencyInput = forwardRef<HTMLDivElement, CurrencyInputProps>(
  ({ leftIcon, rightIcon, label, setValue, initialValue = 0, ...props }, ref): JSX.Element => {
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
      <FormControl ref={ref}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
          <Input
            variant='filled'
            rounded='xl'
            inputMode='numeric'
            fontWeight={500}
            value={formatCurrency(String(Currency.currencyToCents(inputValue)))}
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
  },
)

export default CurrencyInput
