import React, { type ReactNode } from 'react'

type ProviderComposerProps = {
  contexts: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: ReactNode
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
