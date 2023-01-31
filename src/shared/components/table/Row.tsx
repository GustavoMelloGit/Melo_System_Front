import { Td, Tr } from '@chakra-ui/react'
import SpinLoader from '../SpinLoader'
import { type TableRowProps } from './types'

export default function TableRow({
  children,
  isLoading,
  noDataMessage,
  dataLength,
}: TableRowProps): JSX.Element {
  return (
    <>
      {isLoading && (
        <Tr>
          <Td colSpan={100} textAlign='center'>
            <SpinLoader />
          </Td>
        </Tr>
      )}
      {!isLoading && dataLength === 0 ? (
        <Tr>
          <Td id='no-data-cell' colSpan={100} textAlign='center'>
            {noDataMessage ?? 'Nenhum dado encontrado'}
          </Td>
        </Tr>
      ) : (
        children
      )}
    </>
  )
}
