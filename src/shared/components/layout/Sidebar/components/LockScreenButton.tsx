import { useScreenProtectionStore } from '../../../../../lib/stores/ScreenProtectionStore'
import IconButton from '../../../IconButton'

export default function LockScreenButton(): JSX.Element {
  const lockScreen = useScreenProtectionStore((state) => state.lock)
  return (
    <IconButton
      icon='lock'
      iconSize={22}
      aria-label='Proteção de tela'
      title='Ativar proteção de tela'
      onClick={lockScreen}
    />
  )
}
