import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useOutsideClick,
  type InputProps,
} from '@chakra-ui/react'
import { forwardRef, useEffect, useRef, type ChangeEvent, type FocusEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import OptionsBox from './Options'
import { type Option } from './types'
import useAutocomplete from './useView'

type OnSelectData = {
  value: Option['value']
  label: Option['label']
}

export type Props = InputProps & {
  label?: string
  options?: Option[]
  isLoading?: boolean
  error?: string
  handleChange?: (value: string) => void
  handleSelect?: (data: OnSelectData) => void
}
const AutocompleteInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, options, isLoading, handleChange, error, onFocus, handleSelect, isRequired, ...rest },
    forwardRef,
  ): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null)
    const [state, actions] = useAutocomplete()
    const { showOptions } = state
    const { setShowOptions, resetState } = actions

    useOutsideClick({
      ref,
      handler: () => {
        setShowOptions(false)
      },
    })

    function handleShowOptions(): void {
      setShowOptions(true)
    }

    function handleOnFocus(e: FocusEvent<HTMLInputElement>): void {
      handleShowOptions()
      onFocus?.(e)
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>): void {
      if (handleChange) handleChange(e.target.value)
    }

    function handleOnSelect(option: Option): void {
      setShowOptions(false)
      handleSelect?.({
        value: option.value,
        label: option.label,
      })
      if (handleChange) handleChange(String(option.value))
    }

    useEffect(() => {
      // Reset state when component unmounts
      return () => {
        resetState()
      }
    }, [resetState])

    return (
      <FormControl position='relative' ref={ref} isInvalid={Boolean(error)}>
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
        <InputGroup>
          <Input
            variant='filled'
            rounded='xl'
            onChange={handleOnChange}
            autoComplete='off'
            ref={forwardRef}
            {...rest}
            onFocus={handleOnFocus}
          />
          <InputRightElement>
            <Button
              variant='ghost'
              p={0}
              rounded='xl'
              onClick={handleShowOptions}
              isLoading={isLoading}
              isDisabled={rest.isDisabled}
            >
              <IoIosArrowDown />
            </Button>
          </InputRightElement>
        </InputGroup>
        {error && <FormErrorMessage data-cy='validation-message'>{error}</FormErrorMessage>}
        {options && options.length > 0 && (
          <OptionsBox onSelect={handleOnSelect} options={options} showOptions={showOptions} />
        )}
      </FormControl>
    )
  },
)

export default AutocompleteInput
