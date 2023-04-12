import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useOutsideClick,
  type InputProps,
} from '@chakra-ui/react'
import { useEffect, useRef, type ChangeEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import OptionsBox from './Options'
import { type Option } from './types'
import { useAutocompleteStore } from './useAutocomplete'

type Props = InputProps & {
  label?: string
  options?: Option[]
  isLoading?: boolean
  handleChange?: (value: string) => void
  handleBlur?: () => void
  handleFocus?: () => void
}
export default function AutocompleteInput({
  label,
  options,
  isLoading,
  handleChange,
  handleFocus,
  value,
  ...rest
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const {
    setInputValue,
    setShowOptions,
    selectOption,
    inputValue,
    resetState,
    setOptions,
    options: storedOptions,
  } = useAutocompleteStore()
  useOutsideClick({
    ref,
    handler: () => {
      setShowOptions(false)
    },
  })

  function handleShowOptions(): void {
    setShowOptions(true)
  }

  function handleOnFocus(): void {
    handleShowOptions()
    if (handleFocus) handleFocus()
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value)
    if (handleChange) handleChange(e.target.value)
  }

  function handleOnSelect(option: Option): void {
    selectOption(option.value)
    setInputValue(String(option.label))
    setShowOptions(false)
    if (handleChange) handleChange(String(option.value))
  }

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  useEffect(() => {
    const option = storedOptions?.find((option) => option.value === value)
    if (option) {
      setInputValue(String(option.label))
    } else {
      setInputValue(String(value))
    }
  }, [value, options])

  useEffect(() => {
    if (!options) return
    setOptions([...storedOptions, ...options])
  }, [options])

  return (
    <FormControl position='relative' ref={ref}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          variant='filled'
          rounded='xl'
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          value={inputValue}
          {...rest}
        />
        <InputRightElement>
          <Button
            variant='ghost'
            p={0}
            rounded='xl'
            onClick={handleShowOptions}
            isLoading={isLoading}
          >
            <IoIosArrowDown />
          </Button>
        </InputRightElement>
      </InputGroup>
      {options && options.length > 0 && <OptionsBox options={options} onSelect={handleOnSelect} />}
    </FormControl>
  )
}
