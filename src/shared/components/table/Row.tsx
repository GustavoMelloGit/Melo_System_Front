import { Td, Tr } from '@chakra-ui/react'
import SpinLoader from '../SpinLoader'
import { TableRowProps } from './types'

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
          <Td colSpan={100} textAlign='center'>
            {noDataMessage}
          </Td>
        </Tr>
      ) : (
        children
      )}
    </>
  )
}
