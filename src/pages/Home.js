import React, { useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Background, Parallax } from 'react-parallax';
// import { Parallax } from 'react-scroll-parallax';
import { makeStyles } from '@mui/styles';
import MobileEvent from '../components/front_office/display/MobileEvent';
import TabDeskEvent from '../components/front_office/display/TabDeskEvent';
import TabOnly from '../components/front_office/display/TabOnly';
import { eventActions, userEventsActions } from '../actions/index';
import Layout from '../components/front_office/Layout';
import Footer from '../layouts/Footer';
import Langing from './Langing';

const useStyles = makeStyles({
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
    textAlign: 'center'
  },
  footer: {
    height: '10vh',
    margin: 'auto',
    background: '#ff5722',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  }
});
export default function Home() {
  // const [user, setUser]
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
    <>
      <Layout />
      <Langing />
      <Container sx={{ mt: 4 }}>
        {/* <Parallax
          bgImage="/static/mock-images/covers/main.jpg"
          strength={200}
          bgImageStyle={{ height: '100%', width: '90%' }}
        >
          <div style={{ height: 500 }}>
            <div className={styles.root}>Bem vindo ao nossos website eventos</div>
          </div>
        </Parallax> */}
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
      {/* this footer is for large devices */}
      <footer className={styles.footer}>
        <div>ISCIM - Todos direitos reservados - 2022</div>
      </footer>
      <MobileEvent
        events={events}
        user={user?.id}
        userEvents={userEvents}
        isAuthenticated={isAuthenticated}
      />
      {/* this footer is only aplied on mobile devices */}
      <Footer value={0} />
    </>
  );
}
