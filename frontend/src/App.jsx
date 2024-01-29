import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './pages/Admin';
import Auth from './pages/Auth';
import Home from './pages/Admin/Home';
import Analytics from './pages/Admin/Analytics';
import CreatePage from './pages/Admin/CreatePage';
import Poll from './pages/User/Poll';
import Quiz from './pages/User/Quiz';
import UserLayout from './pages/User';
import Results from './pages/User/Results';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'create', element: <CreatePage /> },
        ],
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'user',
        element: <UserLayout />,
        children: [
          {
            path: 'results',
            element: <Results />,
          },
          {
            path: 'poll/:pollId',
            element: <Poll />,
          },
          {
            path: 'quiz/:quizId',
            element: <Quiz />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
