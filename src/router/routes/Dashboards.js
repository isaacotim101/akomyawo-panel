import { lazy } from 'react'

const HomeDashboard = lazy(() => import('../../views/dashboard/home'))

const DashboardRoutes = [
  {
    path: '/dashboard/home',
    element: <HomeDashboard />
  }
]

export default DashboardRoutes
