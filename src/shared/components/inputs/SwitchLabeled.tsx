import { Button, Flex, type ButtonProps, type FlexProps } from '@chakra-ui/react'
import { useState } from 'react'

type Props<T = unknown> = {
  onChange: (value: T) => void
  leftLabel: string
  rightLabel: string
  defaultActive?: number
  leftValue?: T
  rightValue?: T
  leftButtonProps?: ButtonProps & Record<string, string>
  rightButtonProps?: ButtonProps & Record<string, string>
  wrapperProps?: FlexProps
}
export default function SwitchLabeled({
  onChange,
  leftLabel,
  rightLabel,
  defaultActive = 0,
  leftValue,
  rightValue,
  leftButtonProps,
  rightButtonProps,
  wrapperProps,
}: Props): JSX.Element {
  const [currentActive, setCurrentActive] = useState<number>(defaultActive)

  function handleLeftClick(): void {
    if (currentActive === 0) return
    setCurrentActive(0)
    onChange(leftValue ?? false)
  }

  function handleRightClick(): void {
    if (currentActive === 1) return
    setCurrentActive(1)
    onChange(rightValue ?? true)
  }
  return (
    <Flex {...wrapperProps}>
      <Button
        variant={currentActive === 0 ? 'solid' : 'outline'}
        onClick={handleLeftClick}
        rounded={0}
        roundedLeft={4}
        data-current={currentActive === 0}
        {...rightButtonProps}
      >
        {leftLabel}
      </Button>
      <Button
        onClick={handleRightClick}
        variant={currentActive === 1 ? 'solid' : 'outline'}
        rounded={0}
        roundedRight={4}
        data-current={currentActive === 1}
        {...leftButtonProps}
      >
        {rightLabel}
      </Button>
    </Flex>
  )
}
