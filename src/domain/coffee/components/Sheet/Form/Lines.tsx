import { Divider, Grid, GridItem, Heading, IconButton, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form'
import { GiChipsBag } from 'react-icons/gi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  control: Control<SheetFormValues, any>
  register: UseFormRegister<SheetFormValues>
  errors: unknown
}
export default function SheetFormLines({ control, register, errors }: Props): JSX.Element {
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'lines',
  })

  function handleRemoveField(index: number): void {
    if (fields.length === 1) return
    remove(index)
  }

  function handleAddField(index: number): void {
    insert(index + 1, { weight: 0, bags: 0 })
  }

  useEffect(() => {
    if (fields.length === 0) {
      append({ weight: 0, bags: 0 })
    }
  }, [])

  return (
    <Stack spacing={4}>
      <Heading as='h2' size='lg'>
        Linhas
      </Heading>
      <Divider />
      {fields.map((field, index) => (
        <Grid key={field.id} templateColumns='1fr 1fr 40px 40px' gap={4} alignItems='end'>
          <GridItem>
            <RHFField<SheetFormValues>
              name={`lines.${index}.weight`}
              register={register}
              label='Peso'
              placeholder='Ex.: 12'
              type='number'
              inputMode='numeric'
              errors={errors}
              rightIcon='Kg'
            />
          </GridItem>
          <GridItem>
            <RHFField<SheetFormValues>
              name={`lines.${index}.bags`}
              register={register}
              label='Sacos'
              placeholder='Ex.: 10'
              type='number'
              inputMode='numeric'
              errors={errors}
              rightIcon={<GiChipsBag />}
            />
          </GridItem>
          <GridItem>
            <IconButton
              aria-label='Remover linha'
              title='Remover linha'
              color='red.400'
              icon={<IoMdClose />}
              onClick={() => {
                handleRemoveField(index)
              }}
            />
          </GridItem>
          <GridItem>
            <IconButton
              aria-label='Adicionar linha abaixo'
              title='Adicionar linha abaixo'
              color='blue.400'
              icon={<IoMdAdd />}
              onClick={() => {
                handleAddField(index)
              }}
            />
          </GridItem>
        </Grid>
      ))}
    </Stack>
  )
}
