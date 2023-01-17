import React, { PropsWithChildren } from 'react'

export default function Suspense({ children }: PropsWithChildren): JSX.Element {
  return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
}
