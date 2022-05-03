import React, { useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Typography,
  Box
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
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

function TabPanel(props) {
  const { children, value1, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value1 !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value1 === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value1: PropTypes.number.isRequired
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Home() {
  const [value, setValue] = React.useState('');
  const [value1, setValue1] = React.useState(0);

  const styles = useStyles();
  const dispatch = useDispatch();
  const { getEvents } = bindActionCreators(eventActions, dispatch);
  const { getUserEvents } = bindActionCreators(userEventsActions, dispatch);

  const eventos = useSelector((state) => state.events.events);
  const userEvents = useSelector((state) => state.userEvents.eventsUser);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // methods do outdated events
  const today = new Date();
  const eventDate = (date) => new Date(date);
  const events = eventos?.filter((evento) => eventDate(evento?.end_date) > today);
  const heldEvents = eventos?.filter(
    (evento) => eventDate(evento?.end_date) < today && evento.type === value
  );

  useEffect(() => {
    getEvents();
    getUserEvents();
    // show();
    console.log();
    // eslint-disable-next-line
  }, [dispatch, value]);

  // Radio
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  // Tab
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  return (
    <Page title="Home | Iscim">
      <Layout />
      <HomeHeader />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value1}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Proximos Eventos" {...a11yProps(0)} />
            <Tab label="Eventos Realizados" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value1={value1} index={0}>
          <Container>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '2rem',
                color: 'text.secondary',
                fontFamily: 'Old Standard TT, serif'
              }}
            >
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
        </TabPanel>
        <TabPanel value1={value1} index={1}>
          <Grid container>
            <Grid item xs={12} md={2} lg={2}>
              <form>
                <FormControl sx={{ m: 3 }} variant="standard">
                  <FormLabel>Tipo de eventos de deseja ver</FormLabel>
                  <RadioGroup name="last" value={value} onChange={handleRadioChange}>
                    <FormControlLabel value="Palestra" control={<Radio />} label="Palestra" />
                    <FormControlLabel value="Seminario" control={<Radio />} label="Seminario" />
                    <FormControlLabel value="Graduacao" control={<Radio />} label="Graduacao" />
                    <FormControlLabel value="Jornada" control={<Radio />} label="Jornadas" />
                  </RadioGroup>
                </FormControl>
              </form>
            </Grid>
            <Grid item xs={12} md={10} lg={10}>
              <div>
                <TabDeskEvent
                  events={heldEvents}
                  user={user?.id}
                  userEvents={userEvents}
                  isAuthenticated={isAuthenticated}
                />
                <TabOnly
                  events={heldEvents}
                  user={user?.id}
                  userEvents={userEvents}
                  isAuthenticated={isAuthenticated}
                />
              </div>

              <MobileEvent
                events={heldEvents}
                user={user?.id}
                userEvents={userEvents}
                isAuthenticated={isAuthenticated}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

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
