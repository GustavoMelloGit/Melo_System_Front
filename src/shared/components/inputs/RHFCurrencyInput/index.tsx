import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  type InputGroupProps,
  type InputProps,
} from '@chakra-ui/react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  control: Control<TFormValues, any>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  inputGroupProps?: InputGroupProps
  onChangeValue?: (value: number) => void
} & Omit<InputProps, 'name'>

export default function RHFCurrencyInput<TFormValues extends Record<string, unknown>>({
  name,
  control,
  leftIcon,
  rightIcon,
  label,
  inputGroupProps,
  isRequired,
  onChangeValue,
  ...rest
}: FormInputProps<TFormValues>): JSX.Element {
  function formatCurrency(value: string): string {
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100)
    onChangeValue?.((+value ?? 0) / 100)
    if (result === 'NaN') {
      return '0,00'
    }
    if (typeof result === 'string') {
      return result
    }
    return ''
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { invalid, error } }) => (
        <FormControl isInvalid={invalid}>
          {label && (
            <FormLabel>
              {label}
              {isRequired && (
                <Text as='span' color='red.500' ml={1}>
                  *
                </Text>
              )}
            </FormLabel>
          )}
          <InputGroup {...inputGroupProps}>
            {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
            <Input
              variant='filled'
              rounded='xl'
              inputMode='numeric'
              fontWeight={500}
              value={formatCurrency((+value * 100).toString())}
              onChange={async (event) => {
                const { value } = event.target
                const onlyNumbers = value.replace('.', '').replace(',', '').replace(/\D/g, '')
                onChange(+onlyNumbers / 100)
              }}
              {...field}
              {...rest}
            />
            {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
          </InputGroup>
          {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  )
}
