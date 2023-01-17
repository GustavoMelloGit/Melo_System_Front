import React from 'react'
import { RouteObject } from 'react-router-dom'
import { UnprotectedRoute } from '../../../lib/components/Routers'
import { Routes } from '../../../router/routes'
const SignInView = React.lazy(async () => import('../view/SignIn/View'))

export const authRoutes: RouteObject[] = [
  {
    path: Routes.login,
    element: (
      <UnprotectedRoute>
        <React.Suspense fallback={<div>Loading...</div>}>
          <SignInView />
        </React.Suspense>
      </UnprotectedRoute>
    ),
  },
]
