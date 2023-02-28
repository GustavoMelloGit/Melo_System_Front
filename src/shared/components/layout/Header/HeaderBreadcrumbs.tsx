import { Flex, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { BsDot } from 'react-icons/bs'
import { Link as ReactLink } from 'react-router-dom'

type HeaderBreadcrumbsProps = {
  heading: string
  links?: Array<{
    label: string
    to?: string
  }>
  actions?: React.ReactNode
}

export default function HeaderBreadcrumbs({
  heading,
  links,
  actions,
}: HeaderBreadcrumbsProps): JSX.Element {
  return (
    <Flex as='header' w='full' justify='space-between'>
      <VStack align='flex-start'>
        <Heading as='h1'>{heading}</Heading>
        <HStack spacing={2} divider={<BsDot />}>
          {links?.map((link, index) =>
            link.to ? (
              <Link as={ReactLink} to={link.to} key={index} data-cy={`breadcrumb-${link.to}`}>
                {link.label}
              </Link>
            ) : (
              <Text noOfLines={1} key={index} opacity={0.6}>
                {link.label}
              </Text>
            ),
          )}
        </HStack>
      </VStack>
      {actions}
    </Flex>
  )
}
