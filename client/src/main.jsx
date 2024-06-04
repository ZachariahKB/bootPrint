import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';//change
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
//add more and add them below
const router = createBrowserRouter([
  {
    path: "/login",
    element: <App />,
    errorElement: <ErrorPage />,// change routes
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
