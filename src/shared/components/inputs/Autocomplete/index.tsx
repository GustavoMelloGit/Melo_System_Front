import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useOutsideClick,
  type InputProps,
} from '@chakra-ui/react'
import { forwardRef, useEffect, useRef, type ChangeEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import OptionsBox from './Options'
import { type Option } from './types'
import useAutocomplete from './useView'

type Props = InputProps & {
  label?: string
  options?: Option[]
  isLoading?: boolean
  handleChange?: (value: string) => void
  handleBlur?: () => void
  handleFocus?: () => void
}
const AutocompleteInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, options, isLoading, handleChange, handleFocus, value, ...rest },
    forwardRef,
  ): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null)
    const [state, actions] = useAutocomplete()
    const { inputValue, options: storedOptions, showOptions } = state
    const { setInputValue, setShowOptions, selectOption, resetState, setOptions } = actions

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
      // Reset state when component unmounts
      return () => {
        resetState()
      }
    }, [])

    useEffect(() => {
      // Set input value when value prop changes
      const option = storedOptions?.find((option) => option.value === value)
      if (option) {
        setInputValue(String(option.label))
      } else {
        setInputValue(String(value))
      }
    }, [value, options])

    useEffect(() => {
      if (!options) return
      setOptions(options)
    }, [options])

    return (
      <FormControl position='relative' ref={ref}>
        {label && (
          <FormLabel>
            {label}
            {rest.isRequired && (
              <Text as='span' color='red.500' ml={1}>
                *
              </Text>
            )}
          </FormLabel>
        )}
        <InputGroup>
          <Input
            variant='filled'
            rounded='xl'
            onFocus={handleOnFocus}
            onChange={handleOnChange}
            value={inputValue}
            autoComplete='off'
            ref={forwardRef}
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
        {storedOptions && storedOptions.length > 0 && (
          <OptionsBox onSelect={handleOnSelect} options={storedOptions} showOptions={showOptions} />
        )}
      </FormControl>
    )
  },
)

export default AutocompleteInput
