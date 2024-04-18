import { createBrowserRouter, RouterProvider,  Outlet } from 'react-router-dom';
import Application from './components/Application';
import Header from './components/Header';
import Property from './components/Property';
import Properties from './components/Properties';
import Lease from './components/Lease';
import './App.css';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
const router = createBrowserRouter(
[
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Properties />
        },
        {
          path: '/property/:key',
          element: <Property />
        },
        {
          path: 'properties',
          element: <Properties />
        },
        {
          path: 'application/:location',
          element: <Application />
        },
        {
          path: 'lease/:location',
          element: <Lease />
        },
        {
          path: 'application',
          element: <Application />
        }
      ]
    }
  ]
);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
    </div>
  );
}

export default App;
