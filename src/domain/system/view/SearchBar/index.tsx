import { Box, Divider, Flex, LinkBox, LinkOverlay, Skeleton, Stack, Text } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import { formatClientName } from '../../../../lib/utils/formatters'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import Link from '../../../../shared/components/Link'
import Modal from '../../../../shared/components/Modal'
import useSearchBarView from './useView'

export default function SearchBar(): JSX.Element {
  const { isOpen, control, handleClose, clients, showClients, isLoading } = useSearchBarView()
  return (
    <Modal isCentered={false} isOpen={isOpen} onClose={handleClose} closeOnEsc>
      <Modal.Content
        sx={{
          rounded: 8,
          backdropFilter: 'blur(5px)',
          boxShadow: 'unset',
          background: 'rgba(45,55,72,0.4)',
        }}
      >
        <form>
          <ControllerField
            control={control}
            name='search'
            type='search'
            autoComplete='off'
            placeholder='Pesquise um cliente'
            size='lg'
            rounded={8}
          />
          {isLoading && (
            <Stack spacing={0.5}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton rounded={8} key={`skeleton-${index}`} h={10} />
              ))}
            </Stack>
          )}
          {showClients && clients.length > 0 && (
            <Stack
              divider={<Divider />}
              spacing={0}
              onClick={handleClose}
              bg='gray.700'
              rounded={8}
              mt={1}
            >
              {clients.map((client) => (
                <LinkBox as={Flex} key={client.id} p={3}>
                  <LinkOverlay
                    as={Link}
                    _hover={{ textDecoration: 'none' }}
                    to={Routes.clientPage(client.id)}
                  >
                    {formatClientName(client)}
                  </LinkOverlay>
                </LinkBox>
              ))}
            </Stack>
          )}
          {!isLoading && clients.length === 0 && (
            <Box textAlign='center' py={4}>
              <Text>Nenhum cliente encontrado</Text>
            </Box>
          )}
        </form>
      </Modal.Content>
    </Modal>
  )
}
