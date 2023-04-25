import { FormControl, FormLabel, Input, type InputProps } from '@chakra-ui/react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

type Props<TFormValues extends FieldValues> = InputProps & {
  control: Control<TFormValues, any>
  name: Path<TFormValues>
  label?: string
}
export default function RHFDateInput<TFormValues extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: Props<TFormValues>): JSX.Element {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, ...field } }) => {
          let inputValue = ''

          const valueIsNumber = typeof value === 'number' && !isNaN(value)
          if (valueIsNumber) {
            const date = new Date(value)
            inputValue = date.toISOString().split('T')[0]
          }

          return (
            <Input
              variant='filled'
              rounded='xl'
              fontWeight={500}
              type='date'
              inputMode='numeric'
              value={inputValue}
              {...rest}
              {...field}
            />
          )
        }}
      />
    </FormControl>
  )
}
