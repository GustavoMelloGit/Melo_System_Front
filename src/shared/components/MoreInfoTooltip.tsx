import { Tooltip, type TooltipProps } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

type MoreInfoTooltipProps = Omit<TooltipProps, 'children' | 'size'> & {
  children?: ReactNode
  size?: number
}
export default function MoreInfoTooltip({
  label,
  children,
  size = 22,
  ...rest
}: MoreInfoTooltipProps): JSX.Element {
  return (
    <Tooltip shouldWrapChildren hasArrow label={label} {...rest}>
      {children ?? <AiOutlineInfoCircle size={size} />}
    </Tooltip>
  )
}
