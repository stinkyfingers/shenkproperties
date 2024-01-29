import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Application from './components/Application';
import Header from './components/Header';
import Property from './components/Property';
import Properties from './components/Properties';
import './App.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    [
      <Route path="/" element={<Properties />} />,
      <Route path="/property/:key" element={<Property />} />,
      <Route path="properties" element={<Properties />} />,
      <Route path="application/:location" element={<Application />} />,
      <Route path="application" element={<Application />} />
    ]
  )
);

function App() {
  return (
    <div className="App">
        <Header />
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
    </div>
  );
}

export default App;
