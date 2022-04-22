import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// components
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/Page404';
import EventRegister from './pages/EventRegister';
import EventList from './components/events/EventList';
import EventDetail from './components/events/EventDetail';
import Home from './pages/Home';
import DashboardApp from './pages/DashboardApp';
import EventsRequests from './pages/admin/EventsRequests';
import MyEvents from './components/front_office/MyEvents';
import EventRequest from './pages/EventRequest';
import EmailConfirm from './pages/EmailConfirm';
import PasswordReset from './pages/PasswordReset';
import Langing from './pages/Langing';

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return useRoutes([
    {
      path: 'dashboard',
      // eslint-disable-next-line no-nested-ternary
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        // { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'events', element: <EventList /> },
        { path: 'events/requests', element: <EventsRequests /> },
        { path: 'events/new', element: <EventRegister /> },
        { path: 'events/detail/:id', element: <EventDetail /> }
      ]
    },
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'pedido', element: isAuthenticated ? <EventRequest /> : <Navigate to="/login" /> },
        { path: 'meuseventos', element: isAuthenticated ? <MyEvents /> : <Navigate to="/login" /> },
        { path: '*', element: <NotFound /> },
        { path: 'home', element: <Langing /> },
        { path: 'passwordreset', element: <EmailConfirm /> },
        { path: 'createnewpassword', element: <PasswordReset /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
