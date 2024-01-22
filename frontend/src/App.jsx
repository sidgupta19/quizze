import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Auth from './pages/Auth';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'auth', element: <Auth /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
