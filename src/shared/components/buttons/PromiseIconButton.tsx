import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { useState } from 'react'

type Props = IconButtonProps & {
  service: () => Promise<void>
  icon: JSX.Element
}
export default function PromiseIconButton({ service, icon, ...rest }: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  async function handlePrint(): Promise<void> {
    try {
      setIsLoading(true)
      await service()
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }
  return <IconButton icon={icon} isLoading={isLoading} onClick={handlePrint} {...rest} />
}
