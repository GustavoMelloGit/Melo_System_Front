import { Box, Grid, GridItem, Hide, IconButton, Show, useColorModeValue } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { BiSearchAlt } from 'react-icons/bi'
import { PaginationParams } from '../../../lib/constants/pagination'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import RHFField from '../inputs/RHFField'
import RHFSelectField from '../inputs/RHFSelectField'
import { type FilterFormValues, type TableFilterProps } from './types'

export default function TableFilters({ searchForOptions, actions }: TableFilterProps): JSX.Element {
  const { getParam } = useURLSearchParams()
  const { handleAddParams, handleRemoveParams } = useURLSearchParams()
  const bg = useColorModeValue('gray.300', 'gray.700')
  const queryParam = getParam(PaginationParams.searchBy)
  const { handleSubmit, register, watch } = useForm<FilterFormValues>({
    defaultValues: {
      query: queryParam ?? '',
      searchFor: getParam(PaginationParams.searchFor) ?? Object.keys(searchForOptions)[0],
    },
  })
  const currentSearchForOption = searchForOptions[watch('searchFor')]

  function handleSubmitFilter({ query, searchFor }: FilterFormValues): void {
    if (!query) {
      handleRemoveParams([PaginationParams.searchBy, PaginationParams.searchFor])
      return
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
            <RHFSelectField<FilterFormValues>
              name='searchFor'
              register={register}
              options={Object.entries(searchForOptions).map(([value, { label }]) => ({
                value,
                label,
              }))}
              roundedLeft='md'
              roundedRight={['md', 'none']}
            />
            {actions && <Show below='sm'>{actions}</Show>}
          </GridItem>
          <GridItem display='flex' alignItems='center' gap={1}>
            <RHFField<FilterFormValues>
              register={register}
              rounded='md'
              roundedLeft={['md', 'none']}
              placeholder='Pesquisar'
              rightIcon={
                <IconButton
                  type='submit'
                  variant='ghost'
                  aria-label='Search'
                  icon={<BiSearchAlt size={24} />}
                />
              }
              {...(currentSearchForOption?.inputProps ?? {})}
              name='query'
            />
            {actions && <Hide below='sm'>{actions}</Hide>}
          </GridItem>
        </Grid>
      </Box>
    </form>
  )
}
