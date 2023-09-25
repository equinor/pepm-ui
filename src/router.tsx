import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom'
import { App } from './App'
import { ModelView } from './features/ModelView/ModelView'
import { About } from './pages/About/About'
import { Api } from './pages/Api/Api'
import { Browse } from './pages/Browse/Browse'
import { InvalidURL } from './pages/InvalidURL/InvalidURL'
import { Compute } from './pages/ModelPages/Compute/Compute'
import { Model } from './pages/ModelPages/Model/Model'
import { Results } from './pages/ModelPages/Results/Results'

interface Tab extends Required<Pick<NonIndexRouteObject, 'path' | 'element'>> {
  title: string
}

const tabs: Tab[] = [
  {
    title: 'Models',
    path: 'models',
    element: <Browse />,
  },
  { title: 'API', path: 'api', element: <Api /> },
  { title: 'About', path: 'about', element: <About /> },
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
    element: <InvalidURL />,
  },
])

export { router, tabs }
