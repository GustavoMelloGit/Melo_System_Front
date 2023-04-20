import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'
import { type Option } from './types'
import { useAutocompleteStore } from './useAutocomplete'

type Props = {
  onSelect?: (option: Option) => void
}
export default function OptionsBox({ onSelect }: Props): JSX.Element {
  const bgColor = useColorModeValue('gray.100', 'gray.700')
  const { showOptions, options } = useAutocompleteStore(
    (state) => ({
      showOptions: state.showOptions,
      options: state.options,
    }),
    shallow,
  )
  function handleOnClick(option: Option): void {
    if (onSelect) onSelect(option)
  }

  return (
    <Flex
      position='absolute'
      top='100%'
      left={0}
      right={0}
      zIndex={1}
      display={showOptions ? 'flex' : 'none'}
      background={bgColor}
      flexDir='column'
      align='stretch'
      rounded='md'
      overflow='hidden'
      borderWidth={2}
      borderColor='blue.500'
      py={1}
    >
      {options.map((option) => (
        <Button
          key={String(option.value)}
          data-value={option.value}
          variant='ghost'
          rounded={0}
          onClick={() => {
            handleOnClick(option)
          }}
          wordBreak='break-all'
          whiteSpace='normal'
          p={4}
        >
          {option.label}
        </Button>
      ))}
    </Flex>
  )
}
