import React from 'react'

type ProviderComposerProps = {
  contexts: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: JSX.Element
}
export default function ProviderComposer({
  contexts,
  children,
}: ProviderComposerProps): JSX.Element {
  return (
    <>
      {contexts.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children,
      )}
    </>
  )
}
