import {
  Box,
  Grid,
  GridItem,
  Hide,
  IconButton,
  Select,
  Show,
  useColorModeValue,
} from '@chakra-ui/react'
import { cloneElement } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiSearchAlt } from 'react-icons/bi'
import { PaginationParams } from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import RHFField from '../inputs/RHFField'
import { type FilterFormValues, type TableFilterProps } from './types'

export default function TableFilters({ searchForOptions, actions }: TableFilterProps): JSX.Element {
  const { getParam } = useURLSearchParams()
  const { handleAddParams, handleRemoveParams } = useURLSearchParams()
  const bg = useColorModeValue('gray.200', 'gray.700')
  const queryParam = getParam(PaginationParams.searchBy)
  const { handleSubmit, register, watch, control } = useForm<FilterFormValues>({
    defaultValues: {
      query: queryParam ?? '',
      searchFor: getParam(PaginationParams.searchFor) ?? Object.keys(searchForOptions)[0],
    },
  })
  const currentSearchForOption = searchForOptions[watch('searchFor')]
  const { inputProps, Input } = currentSearchForOption
  const DOMProperties = { ...inputProps }
  delete DOMProperties?.valueGetter

  function handleSubmitFilter({ query, searchFor }: FilterFormValues): void {
    if (!query) {
      handleRemoveParams([PaginationParams.searchBy, PaginationParams.searchFor])
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

  return (
    <form onSubmit={handleSubmit(handleSubmitFilter)}>
      <Box bg={bg} px={4} pt={4} roundedTop={16}>
        <Grid templateColumns={['1fr', '1fr 3fr']} templateRows={['1fr 1fr', 'auto']} gap={1}>
          <GridItem display='flex' alignItems='center' gap={1}>
            <Controller
              control={control}
              name={PaginationParams.searchFor}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  variant='filled'
                  roundedLeft='md'
                  roundedRight={['md', 'none']}
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
                  cloneElement(Input, {
                    ...DOMProperties,
                    ...field,
                  })
                }
              />
            ) : (
              <RHFField<FilterFormValues>
                register={register}
                rounded='md'
                roundedLeft={['md', 'none']}
                placeholder='Pesquisar'
                {...(DOMProperties ?? {})}
                name='query'
                data-cy='table-search-input'
              />
            )}
            <IconButton
              type='submit'
              variant='ghost'
              aria-label='Pesquisar'
              title='Pesquisar'
              icon={<BiSearchAlt size={24} />}
              data-cy='table-submit-search-button'
            />
            {actions && <Hide below='sm'>{actions}</Hide>}
          </GridItem>
        </Grid>
      </Box>
    </form>
  )
}
