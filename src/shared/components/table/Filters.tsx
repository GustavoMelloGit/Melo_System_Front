import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Hide,
  InputGroup,
  InputRightAddon,
  Select,
  Show,
  useColorModeValue,
  VisuallyHidden,
  type SystemStyleObject,
} from '@chakra-ui/react'
import { cloneElement, useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PaginationParams } from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import IconButton from '../IconButton'
import ControllerField from '../inputs/ControllerField'
import { type FilterFormValues, type TableFilterProps } from './types'

const isMobile = window.screen.width < 768

const defaultStyle: SystemStyleObject = {
  borderLeftRadius: 0,
  rounded: 'none',
}

export default function TableFilters({ searchForOptions, actions }: TableFilterProps): JSX.Element {
  const { handleAddParams, handleRemoveParams, getParam } = useURLSearchParams()
  const containerBgColor = useColorModeValue('gray.200', 'gray.700')
  const queryParam = getParam(PaginationParams.searchBy)
  const { handleSubmit, watch, control, reset } = useForm<FilterFormValues>({
    defaultValues: {
      query: queryParam ?? '',
      searchFor: getParam(PaginationParams.searchFor) ?? Object.keys(searchForOptions)[0],
    },
  })
  const currentSearchForOption = searchForOptions[watch('searchFor')]
  const { inputProps, Input } = currentSearchForOption
  const DOMProperties = { autoFocus: !isMobile, ...inputProps }
  delete DOMProperties?.valueGetter

  const handleCleanFilter = useCallback((): void => {
    handleRemoveParams([PaginationParams.searchBy, PaginationParams.searchFor])
    reset({
      query: '',
      searchFor: Object.keys(searchForOptions)[0],
    })
  }, [reset, searchForOptions, handleRemoveParams])

  const handleSubmitFilter = ({ query, searchFor }: FilterFormValues): void => {
    if (!query) {
      handleCleanFilter()
      return
    }
    if (inputProps?.valueGetter) {
      query = inputProps.valueGetter(query)
    }

    handleAddParams({
      query,
      searchFor,
    })
  }

  const handleClickEsc = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') handleCleanFilter()
    },
    [handleCleanFilter],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleClickEsc)
    return () => {
      window.removeEventListener('keydown', handleClickEsc)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(handleSubmitFilter)}>
      <Box bg={containerBgColor} px={4} pt={4} roundedTop={16}>
        <Grid
          templateColumns={{ base: '1fr', sm: '1fr 3fr' }}
          templateRows={{ base: '1fr 1fr', sm: 'auto' }}
          gap={1}
        >
          <GridItem display='flex' alignItems='center' gap={1}>
            <Controller
              control={control}
              name={PaginationParams.searchFor}
              render={({ field: { onChange, ...field } }) => (
                <FormControl>
                  <VisuallyHidden>
                    <FormLabel>Selecione qual propriedade deseja pesquisar</FormLabel>
                  </VisuallyHidden>
                  <Select
                    variant='filled'
                    roundedLeft='md'
                    roundedRight={{ base: 'md', sm: 'none' }}
                    data-cy='table-searchFor-select'
                    fontWeight={500}
                    onChange={(e) => {
                      onChange(e)
                      handleRemoveParams([PaginationParams.searchBy, PaginationParams.searchFor])
                    }}
                    {...field}
                  >
                    {Object.entries(searchForOptions).map(([value, { label }]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {actions && <Show below='sm'>{actions}</Show>}
          </GridItem>
          <GridItem display='flex' alignItems='center' gap={1}>
            <InputGroup>
              {Input ? (
                <Controller
                  name={PaginationParams.searchBy}
                  control={control}
                  render={({ field }) =>
                    cloneElement(Input(field), {
                      sx: defaultStyle,
                      ...DOMProperties,
                    })
                  }
                />
              ) : (
                <ControllerField
                  control={control}
                  rounded='none'
                  type='search'
                  placeholder='Pesquisar'
                  {...(DOMProperties ?? {})}
                  name='query'
                  data-cy='table-search-input'
                />
              )}
              <InputRightAddon
                transition='all 200ms'
                px={0}
                minW={{
                  base: '3rem',
                  sm: '4rem',
                }}
              >
                <IconButton
                  w='full'
                  type='submit'
                  variant='ghost'
                  aria-label='Pesquisar'
                  title='Pesquisar'
                  icon={'search'}
                  data-cy='table-submit-search-button'
                  rounded='none'
                />
              </InputRightAddon>
            </InputGroup>
            {actions && <Hide below='sm'>{actions}</Hide>}
          </GridItem>
        </Grid>
      </Box>
    </form>
  )
}
