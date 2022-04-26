import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@mui/styles';
import MobileEvent from '../components/front_office/display/MobileEvent';
import TabDeskEvent from '../components/front_office/display/TabDeskEvent';
import TabOnly from '../components/front_office/display/TabOnly';
import { eventActions, userEventsActions } from '../actions/index';
import Layout from '../components/front_office/Layout';
import Footer from '../layouts/Footer';
import HomeHeader from './HomeHeader';
import { MHidden } from '../components/@material-extend';
import Page from '../components/Page';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: 'transparent',
    color: '#fff',
    padding: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  text: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    boxShadow: '10px'
  },
  footer: {
    [breakpoints.up('sm')]: {
      height: '10vh',

      background: '#ff5722',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      WebkitBoxShadow: '20px',
      mozBoxShadow: '20px',
      boxShadow: '20px',
      '& p': {
        margin: 'auto',
        color: '#fff',
        fontSize: '1.2rem'
      }
    }
  }
}));
export default function Home() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { getEvents } = bindActionCreators(eventActions, dispatch);
  const { getUserEvents } = bindActionCreators(userEventsActions, dispatch);

  useEffect(() => {
    getEvents();
    getUserEvents();
    // eslint-disable-next-line
  }, [dispatch]);
  const events = useSelector((state) => state.events.events);
  const userEvents = useSelector((state) => state.userEvents.eventsUser);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Page title="Register | Iscim">
      <Layout />
      <HomeHeader />
      <Container sx={{ mt: 4 }}>
        <Typography sx={{ textAlign: 'center', fontSize: '2rem', color: 'text.secondary' }}>
          Proximos Eventos
        </Typography>
        <div style={{ marginTop: '50px' }}>
          <TabDeskEvent
            events={events}
            user={user?.id}
            userEvents={userEvents}
            isAuthenticated={isAuthenticated}
          />
          <TabOnly
            events={events}
            user={user?.id}
            userEvents={userEvents}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </Container>

      <MobileEvent
        events={events}
        user={user?.id}
        userEvents={userEvents}
        isAuthenticated={isAuthenticated}
      />
      {/* this footer is only aplied on mobile devices */}
      <Footer value={0} />
      {/* this footer is for large devices */}
      <MHidden width="mdDown">
        <footer className={styles.footer}>
          <p>ISCIM - Todos direitos reservados - 2022</p>
        </footer>
      </MHidden>
    </Page>
  );
}
