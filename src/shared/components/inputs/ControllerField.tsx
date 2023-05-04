import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  type InputProps,
} from '@chakra-ui/react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

type Props<TFormValues extends FieldValues> = InputProps & {
  control: Control<TFormValues>
  name: Path<TFormValues>
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
export default function ControllerField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  leftIcon,
  rightIcon,
  ...rest
}: Props<TFormValues>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormControl isInvalid={invalid}>
          {label && <FormLabel>{label}</FormLabel>}
          <InputGroup>
            {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
            <Input variant='filled' rounded='xl' fontWeight={500} {...rest} {...field} />
            {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
          </InputGroup>
          {error?.message && (
            <FormErrorMessage data-cy='validation-message'>{error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  )
}
