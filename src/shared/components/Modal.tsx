import {
  Modal as ChakraModal,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type HeadingProps,
  type ModalBodyProps,
  type ModalCloseButtonProps,
  type ModalContentProps,
  type ModalFooterProps,
  type ModalHeaderProps,
  type ModalProps,
} from '@chakra-ui/react'

type Props = ModalProps & {
  showOverlay?: boolean
  showCloseButton?: boolean
}
function Modal({
  children,
  showOverlay = true,
  showCloseButton = true,
  ...props
}: Props): JSX.Element {
  return (
    <ChakraModal isCentered {...props}>
      {showOverlay && <ModalOverlay />}
      {children}
    </ChakraModal>
  )
}

function CloseButton(props: ModalCloseButtonProps): JSX.Element {
  return <ModalCloseButton {...props} />
}
function Content({ children, ...props }: ModalContentProps): JSX.Element {
  return <ModalContent {...props}>{children}</ModalContent>
}
function Body({ children, ...props }: ModalBodyProps): JSX.Element {
  return <ModalBody {...props}>{children}</ModalBody>
}
function Header({ children, ...props }: ModalHeaderProps): JSX.Element {
  return <ModalHeader {...props}>{children}</ModalHeader>
}
function Footer({ children, ...props }: ModalFooterProps): JSX.Element {
  return <ModalFooter {...props}>{children}</ModalFooter>
}
function Title({ children, ...props }: HeadingProps): JSX.Element {
  return (
    <Heading as='h1' fontSize='3xl' {...props}>
      {children}
    </Heading>
  )
}

Modal.CloseButton = CloseButton
Modal.Content = Content
Modal.Body = Body
Modal.Header = Header
Modal.Footer = Footer
Modal.Title = Title

export default Modal
