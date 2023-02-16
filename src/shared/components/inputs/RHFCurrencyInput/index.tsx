import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  type InputGroupProps,
  type InputProps,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  Controller,
  get,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  control: Control<TFormValues, any>
  errors?: unknown
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  inputGroupProps?: InputGroupProps
} & Omit<InputProps, 'name'>

export default function RHFCurrencyInput<TFormValues extends Record<string, unknown>>({
  name,
  rules,
  control,
  errors,
  leftIcon,
  rightIcon,
  label,
  inputGroupProps,
  ...rest
}: FormInputProps<TFormValues>): JSX.Element {
  const [inputValue, setInputValue] = useState<number>(0)
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

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
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...field } }) => (
        <FormControl isInvalid={hasError}>
          {label && <FormLabel>{label}</FormLabel>}
          <InputGroup {...inputGroupProps}>
            {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
            <Input
              variant='filled'
              rounded='xl'
              inputMode='numeric'
              fontWeight={500}
              value={formatCurrency((inputValue * 100).toString())}
              onChange={async (event) => {
                const { value } = event.target
                const onlyNumbers = value.replace('.', '').replace(',', '').replace(/\D/g, '')
                setInputValue(+onlyNumbers / 100)
                onChange(+onlyNumbers / 100)
              }}
              {...field}
              {...rest}
            />
            {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
          </InputGroup>
          {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  )
}
