import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom'
import { App } from './App'
import { ModelView } from './features/ModelView/ModelView'
import { Browse } from './pages/Browse/Browse'
import { Compute } from './pages/Compute/Compute'
import { Model } from './pages/Model/Model'
import { Results } from './pages/Results/Results'

interface Tab extends Required<Pick<NonIndexRouteObject, 'path' | 'element'>> {
  title: string
}

const NotImplemented = () => <p>Not implemented</p>

const tabs: Tab[] = [
  {
    title: 'Models',
    path: 'models',
    element: <Browse />,
  },
  { title: 'API', path: 'api', element: <NotImplemented /> },
  { title: 'About', path: 'about', element: <NotImplemented /> },
]
const appRoutes = (tabs as NonIndexRouteObject[]).concat([
  {
    path: 'model/:id/',
    element: <Model />,
    children: [
      {
        path: 'details',
        element: <ModelView />,
      },
      {
        path: 'compute',
        element: <Compute />,
      },
      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
])

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: appRoutes,
  },
  {
    path: '*',
    element: <p>Invalid url</p>,
  },
])

export { router, tabs }
