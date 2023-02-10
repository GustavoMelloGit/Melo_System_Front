import { Box } from '@chakra-ui/react'
import { useModal } from '../hooks/useModal'

export default function ModalManager(): JSX.Element | null {
  const modal = useModal((state) => state.modal)
  return (
    <Box role='presentation' zIndex={101}>
      {modal}
    </Box>
  )
}
