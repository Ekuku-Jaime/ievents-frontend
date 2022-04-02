// redux
import { Provider } from 'react-redux';
// routes
// import Router from './routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import store from './store';
import DashboardApp from './pages/DashboardApp';
import EventForm from './components/events/EventForm';
import DashboardLayout from './layouts/dashboard';
import EventList from './components/events/EventList';
import EventEdit from './components/events/EventEdit';
import EventRegister from './pages/EventRegister';
import EventDetail from './components/events/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import Home from './pages/Home';
import StudentEventDetail from './components/front_office/StudentEventDetail';
import EventRequest from './pages/EventRequest';
import EventsRequests from './pages/admin/EventsRequests';
import PrivateRoutes from './routers/PrivateRoute';
import Activate from './components/authentication/Activate';
import MyEvents from './components/front_office/MyEvents';
import UserEvents from './pages/UserEvents';
import Page404 from './pages/Page404';
import Layout from './components/front_office/Layout';
import Alerts from './components/Alerts';

// ----------------------------------------------------------------------

const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

export default function App() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Alerts />
          <BrowserRouter>
            <Routes>
              {/* <Route path="login" element={<Blog />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="activate/:uid/:token" element={<Activate />} />

              {/* <Route path="pedido" element={<EventRequest />} /> */}
              <Route path="event/detail/:id" element={<StudentEventDetail />} />

              <Route path="/" element={<PrivateRoutes />}>
                <Route path="pedido" element={<EventRequest />} />
                <Route path="myevents" element={<UserEvents />} />

                <Route exact path="/dashboard" element={<DashboardLayout />}>
                  <Route path="app" element={<DashboardApp />} />
                  <Route path="events" element={<EventList />} />
                  <Route path="events/new" element={<EventRegister />} />
                  <Route path="events/detail/:id" element={<EventDetail />} />
                  <Route path="events/requests" element={<EventsRequests />} />
                </Route>
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
          {/* <Router /> */}
        </ThemeConfig>
      </AlertProvider>
    </Provider>
  );
}
