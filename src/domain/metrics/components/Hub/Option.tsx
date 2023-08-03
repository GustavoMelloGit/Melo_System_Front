import { Box, Card, CardBody, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  subtitle: string
  icon: ReactNode
  url: string
}
export default function MetricsHubOption({ icon, subtitle, title, url }: Props): JSX.Element {
  return (
    <LinkBox
      as={Card}
      transition='transform 120ms ease-in'
      _hover={{
        transform: 'scale(1.01)',
      }}
    >
      <CardBody>
        <Flex gap={2}>
          {icon}
          <Box>
            <Heading as='h2' fontSize='lg' mb={0.5}>
              {title}
            </Heading>
            <Heading as='h3' fontSize='sm' fontWeight={500} opacity={0.7}>
              <LinkOverlay as={Link} to={url}>
                {subtitle}
              </LinkOverlay>
            </Heading>
          </Box>
        </Flex>
      </CardBody>
    </LinkBox>
  )
}
