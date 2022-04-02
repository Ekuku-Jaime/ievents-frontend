// import { Navigate, useRoutes } from 'react-router-dom';
// // layouts
// import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// //
// import Login from './pages/Login';
// import Register from './pages/Register';
// import NotFound from './pages/Page404';
// import EventRegister from './pages/EventRegister';
// import EventList from './components/events/EventList';
// import EventEdit from './components/events/EventEdit';
// import DefesaCreate from './components/events/DefesaCreate';
// import EventDetail from './components/events/EventDetail';

// // ----------------------------------------------------------------------

// export default function Router() {
//   return useRoutes([
//     {
//       path: '/dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" replace /> },
//         { path: 'app', element: <DefesaCreate /> },
//         { path: 'user', element: <EventList /> },
//         { path: 'products', element: <EventEdit /> },
//         { path: 'blog', element: <EventRegister /> },
//         { path: 'desc', element: <EventDetail /> }
//       ]
//     },
//     {
//       path: '/',
//       element: <LogoOnlyLayout />,
//       children: [
//         { path: 'login', element: <Login /> },
//         { path: 'register', element: <Register /> },
//         { path: '404', element: <NotFound /> },
//         { path: '/', element: <Navigate to="/dashboard" /> },
//         { path: '*', element: <Navigate to="/404" /> }
//       ]
//     },
//     { path: '*', element: <Navigate to="/404" replace /> }
//   ]);
// }
