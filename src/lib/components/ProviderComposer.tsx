import React from 'react'

type ProviderComposerProps = {
  contexts: JSX.Element[]
  children: JSX.Element
}
export default function ProviderComposer({
  contexts,
  children,
}: ProviderComposerProps): JSX.Element {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  )
}
