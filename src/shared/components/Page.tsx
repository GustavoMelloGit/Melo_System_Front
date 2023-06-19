import { VStack, type StackProps } from '@chakra-ui/react'
import { forwardRef, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

type Props = StackProps & {
  children: ReactNode
  meta?: ReactNode
  title: string
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Melo System`}</title>
      {meta}
    </Helmet>

    <VStack align='stretch' spacing={10} flex={1} ref={ref} {...other}>
      {children}
    </VStack>
  </>
))

export default Page
