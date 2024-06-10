import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleProject from './pages/SingleProject';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import Resource from './pages/Resource';
//add more and add them below
const defaultTheme = createTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,// change routes
    children: [
      {
        index: true,
        element: <Login/>
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/resources',
        element: <Resource />
      },
      {
        path: '/profiles/:username',
        element: <Profile />
      },
       {
        path: '/profile',
        element: <Profile />
       },
      {
        path: '/project/:projectId',
        element: <SingleProject />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={defaultTheme}>
    {/* <CssBaseline /> */}
    <RouterProvider router={router} />
   </ThemeProvider>
);