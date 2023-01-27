import { Box, Grid, GridItem, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { BiFilter, BiSearchAlt } from 'react-icons/bi'
import useParams from '../../hooks/useParams'
import RHFField from '../inputs/RHFField'
import RHFSelectField from '../inputs/RHFSelectField'
import { type TableFilterProps } from './types'

export default function TableFilters({ searchForOptions }: TableFilterProps): JSX.Element {
  const { getParam } = useParams()
  const bg = useColorModeValue('gray.300', 'gray.700')
  const queryParam = getParam('query')
  const { handleSubmit, register } = useForm<FilterFormValues>({
    defaultValues: {
      query: queryParam ?? '',
      searchFor: getParam('searchFor') ?? searchForOptions[0].value,
    },
  })
  const { handleAddParams, handleRemoveParams } = useParams()

  function handleSubmitFilter({ query, searchFor }: FilterFormValues): void {
    if (!query) {
      handleRemoveParams(['query', 'searchFor'])
      return
    }
    handleAddParams({
      query,
      searchFor,
    })
  }
  return (
    <Box bg={bg} px={4} pt={4} roundedTop={16}>
      <form onSubmit={handleSubmit(handleSubmitFilter)}>
        <Grid templateColumns='1fr 3fr 40px' gap={1}>
          <GridItem>
            <RHFSelectField<FilterFormValues>
              name='searchFor'
              register={register}
              options={searchForOptions}
              roundedLeft='md'
              roundedRight='none'
            />
          </GridItem>
          <GridItem>
            <RHFField<FilterFormValues>
              name='query'
              register={register}
              rounded='md'
              roundedLeft='none'
              placeholder='Pesquisar'
              rightIcon={
                <IconButton
                  type='submit'
                  variant='ghost'
                  aria-label='Search'
                  icon={<BiSearchAlt size={24} />}
                />
              }
            />
          </GridItem>
          <GridItem>
            <IconButton
              aria-label='open filter modal'
              variant='ghost'
              icon={<BiFilter size={28} />}
            />
          </GridItem>
        </Grid>
      </form>
    </Box>
  )
}

type FilterFormValues = {
  query: string
  searchFor: string
}
