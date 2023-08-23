import { Tooltip } from '@chakra-ui/react'
import { useScreenProtectionStore } from '../../../../../lib/stores/ScreenProtectionStore'
import IconButton from '../../../IconButton'

export default function LockScreenButton(): JSX.Element {
  const lockScreen = useScreenProtectionStore((state) => state.lock)
  return (
    <Tooltip label='Bloqueio de tela' hasArrow>
      <IconButton
        icon='lock'
        iconSize={22}
        aria-label='Proteção de tela'
        title='Ativar proteção de tela'
        onClick={lockScreen}
      />
    </Tooltip>
  )
}
