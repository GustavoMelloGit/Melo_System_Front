import {
  Box,
  Grid,
  GridItem,
  Hide,
  Select,
  Show,
  useColorModeValue,
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
}

export default function TableFilters({ searchForOptions, actions }: TableFilterProps): JSX.Element {
  const { handleAddParams, handleRemoveParams, getParam } = useURLSearchParams()
  const bg = useColorModeValue('gray.200', 'gray.700')
  const queryParam = getParam(PaginationParams.searchBy)
  const { handleSubmit, watch, control, reset } = useForm<FilterFormValues>({
    defaultValues: {
      query: queryParam ?? '',
      searchFor: getParam(PaginationParams.searchFor) ?? Object.keys(searchForOptions)[0],
    },
  })
  const currentSearchForOption = searchForOptions[watch('searchFor')]
  const { inputProps, Input } = currentSearchForOption
  const DOMProperties = { ...inputProps }
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
      <Box bg={bg} px={4} pt={4} roundedTop={16}>
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
              )}
            />
            {actions && <Show below='sm'>{actions}</Show>}
          </GridItem>
          <GridItem display='flex' alignItems='center' gap={1}>
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
                rounded='md'
                type='search'
                roundedLeft={{ base: 'md', sm: 'none' }}
                placeholder='Pesquisar'
                autoFocus={!isMobile}
                {...(DOMProperties ?? {})}
                name='query'
                data-cy='table-search-input'
              />
            )}

            <IconButton
              type={queryParam ? 'submit' : 'button'}
              variant='ghost'
              aria-label='Pesquisar'
              title='Pesquisar'
              icon={queryParam ? 'close' : 'search'}
              data-cy='table-submit-search-button'
              onClick={queryParam ? handleCleanFilter : undefined}
            />
            {actions && <Hide below='sm'>{actions}</Hide>}
          </GridItem>
        </Grid>
      </Box>
    </form>
  )
}
