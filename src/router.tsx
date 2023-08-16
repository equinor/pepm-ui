import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom'
import { App } from './App'
import { Browse } from './pages/Browse/Browse'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: tabs,
  },
  {
    path: '*',
    element: <p>Invalid url</p>,
  },
])

export { router, tabs }
