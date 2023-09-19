import { Button, type ButtonProps } from '@chakra-ui/react'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import useLayoutContext from '../../../../hooks/useLayoutContext'

export default function ToggleSidebarButton(props: ButtonProps): JSX.Element {
  const {
    sidebar: { isOpen, toggle },
  } = useLayoutContext()

  return (
    <Button
      onClick={toggle}
      w={14}
      variant='ghost'
      aria-label='close sidebar'
      sx={{ aspectRatio: '1 / 1' }}
      {...props}
    >
      {isOpen ? <RxDoubleArrowLeft size={22} /> : <RxDoubleArrowRight size={22} />}
    </Button>
  )
}
