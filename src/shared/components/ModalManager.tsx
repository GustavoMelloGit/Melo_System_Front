import { useModal } from '../hooks/useModal'

export default function ModalManager(): JSX.Element | null {
  const modal = useModal((state) => state.modal)
  return modal
}
