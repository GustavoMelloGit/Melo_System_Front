import { Box, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { BiFilter, BiSearchAlt } from 'react-icons/bi'
import useParams from '../../hooks/useParams'
import RHFField from '../inputs/RHFField'
import RHFSelectField from '../inputs/RHFSelectField'
import { type TableFilterProps } from './types'

export default function TableFilters({ searchForOptions }: TableFilterProps): JSX.Element {
  const { handleSubmit, register } = useForm<FilterFormValues>()
  const { handleAddParams } = useParams()

  function handleSubmitFilter({ query, searchFor }: FilterFormValues): void {
    handleAddParams({
      query,
      searchFor,
    })
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(handleSubmitFilter)}>
        <Grid templateColumns='1fr 3fr 40px' gap={2}>
          <GridItem>
            <RHFSelectField<FilterFormValues>
              name='searchFor'
              register={register}
              options={searchForOptions}
              rounded='md'
            />
          </GridItem>
          <GridItem>
            <RHFField<FilterFormValues>
              name='query'
              register={register}
              rounded='md'
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
