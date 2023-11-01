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
import { Results } from './pages/ModelPages/Results/Results';

interface Tab extends Required<Pick<NonIndexRouteObject, 'path' | 'element'>> {
  title: string;
}

const tabs: Tab[] = [
  {
    title: 'Models',
    path: 'models',
    element: <Browse />,
  },
  { title: 'API', path: 'api', element: <Api /> },
  { title: 'About', path: 'about', element: <About /> },
];
const appRoutes = (tabs as NonIndexRouteObject[]).concat([
  {
    path: 'model/:modelId/',
    element: <Model />,
    children: [
      {
        path: 'details',
        element: <ModelView />,
      },

      {
        path: 'variogram',
        element: <ComputeVariogram />,
      },
      {
        path: 'object',
        element: <ComputeObject />,
      },

      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
]);

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
