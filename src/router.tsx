import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom';
import { App } from './App';
import { ModelView } from './features/ModelView/ModelView';
import { About } from './pages/About/About';
import { Api } from './pages/Api/Api';
import { Browse } from './pages/Browse/Browse';
import { InvalidURL } from './pages/InvalidURL/InvalidURL';
import { ComputeObject } from './pages/ModelPages/Compute/ComputeObject/ComputeObject';
import { ComputeVariogram } from './pages/ModelPages/Compute/ComputeVariogram/ComputeVariogram';
import { Model } from './pages/ModelPages/Model/Model';
import { ObjectResult } from './pages/ModelPages/Results/ObjectResult/ObjectResult';
import { VariogramResults } from './pages/ModelPages/Results/VariogramResults/VariogramResults';

interface Tab extends Required<Pick<NonIndexRouteObject, 'path' | 'element'>> {
  title: string;
}

const tabs: Tab[] = [
  { title: 'Models', path: '/', element: <Browse /> },
  { title: 'API', path: 'api', element: <Api /> },
  { title: 'About', path: 'about', element: <About /> },
];

const appRoutes = [
  {
    index: true,
    element: <Browse />,
  },
  {
    path: 'api',
    element: <Api />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: ':modelId/',
    element: <Model />,
    children: [
      {
        path: 'details',
        element: <ModelView />,
      },

      {
        path: 'compute/variogram',
        element: <ComputeVariogram />,
      },
      {
        path: 'compute/object',
        element: <ComputeObject />,
      },

      {
        path: 'results/variogram',
        element: <VariogramResults />,
      },
      {
        path: 'results/object',
        element: <ObjectResult />,
      },
    ],
  },
];

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
]);

export { router, tabs };
