import React from 'react'
import ReactDOM from 'react-dom/client'
import './output.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/login';
import ErrorPage from './pages/errorPage';
import Register from './pages/register';
import Chat from './pages/chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,

  },
  {
    path: '/chat',
    element: <Chat />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/chat/:id',
        element: <Chat />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
