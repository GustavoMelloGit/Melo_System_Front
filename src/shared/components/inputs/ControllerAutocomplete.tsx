import { type ReactNode } from 'react'
import {
  Controller,
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import AutocompleteInput, { type Props as AutocompleteProps } from './Autocomplete'

type Props<TFormValues extends FieldValues> = AutocompleteProps & {
  control: Control<TFormValues>
  name: Path<TFormValues>
  auxName: Path<TFormValues>
  label?: ReactNode
}

export default function ControllerAutocomplete<TFormValues extends FieldValues>({
  control,
  name,
  auxName,
  ...props
}: Props<TFormValues>): JSX.Element {
  const mainField = useController({
    control,
    name,
  })

  return (
    <Controller
      name={auxName}
      control={control}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <AutocompleteInput
          error={error?.message}
          handleSelect={({ label, value }) => {
            mainField.field.onChange(value)
            onChange(label)
          }}
          onChange={onChange}
          {...field}
          {...props}
        />
      )}
    />
  )
}
