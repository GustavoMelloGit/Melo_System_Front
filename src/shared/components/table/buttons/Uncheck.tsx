import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { BiBlock } from 'react-icons/bi'

export default function TableUncheckButton(props: IconButtonProps): JSX.Element {
  return (
    <IconButton
      icon={<BiBlock size={20} />}
      variant='ghost'
      data-cy='table-uncheck-button'
      {...props}
    />
  )
}
