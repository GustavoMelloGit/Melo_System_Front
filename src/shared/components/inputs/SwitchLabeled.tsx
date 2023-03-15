import { Button, Flex, useColorModeValue, type ButtonProps, type FlexProps } from '@chakra-ui/react'
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
  const wrapperBg = useColorModeValue('gray.300', 'gray.700')
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
    <Flex p={1} gap={1} bg={wrapperBg} rounded={8} {...wrapperProps}>
      <Button
        variant={currentActive === 0 ? 'solid' : 'ghost'}
        onClick={handleLeftClick}
        rounded={4}
        data-current={currentActive === 0}
        px={10}
        size='sm'
        {...rightButtonProps}
      >
        {leftLabel}
      </Button>
      <Button
        onClick={handleRightClick}
        variant={currentActive === 1 ? 'solid' : 'ghost'}
        rounded={4}
        data-current={currentActive === 1}
        px={10}
        size='sm'
        {...leftButtonProps}
      >
        {rightLabel}
      </Button>
    </Flex>
  )
}
