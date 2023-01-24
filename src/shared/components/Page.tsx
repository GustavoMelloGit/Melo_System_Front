import { StackProps, VStack } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
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

    <VStack align='stretch' spacing={10} ref={ref} {...other}>
      {children}
    </VStack>
  </>
))

export default Page
