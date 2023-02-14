type Props = {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}

export default function renderWithProviders(props: Props): JSX.Element {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children,
      )}
    </>
  )
}
