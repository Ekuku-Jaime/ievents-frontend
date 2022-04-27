import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Card, Container, Typography } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView
} from '@devexpress/dx-react-scheduler-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { styled } from '@mui/styles';
import { userEventsActions } from '../../actions';
import Layout from './Layout';
import Page from '../Page';
import Footer from '../../layouts/Footer';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));
export default function MyEvents() {
  const [currentViewName, setCurrentViewName] = useState('Month');

  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  };

  const dispatch = useDispatch();

  const { getUserEvents } = bindActionCreators(userEventsActions, dispatch);

  const user = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.userEvents.eventsUser);

  const as = [];
  const userEvents = events
    .filter((event) => event.user === user?.id)
    .map((item) =>
      as.push({
        startDate: moment(item.evento.initial_date).format('lll'),
        endDate: moment(item.evento.end_date).format('lll'),
        title: item.evento.title
      })
    );

  useEffect(() => {
    if (events.length === 0) {
      getUserEvents();
    }
    if (user) {
      console.log(user.id);
    }

    // eslint-disable-next-line
  }, [events]);

  const currentDate = moment(new Date()).format();
  return (
    <Page title="Pedidos|Ievents">
      <Layout />
      <ContentStyle>
        <CardStyled>
          <Typography
            component="div"
            sx={{ fontSize: '2rem', color: 'text.secondary', mt: 2, textAlign: 'center' }}
          >
            Ola aqui podes consultar os teus eventos
          </Typography>
          <Paper>
            <SchedulerStyle data={as}>
              <ViewState
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                onCurrentViewNameChange={currentViewNameChange}
              />

              <WeekView startDayHour={10} endDayHour={19} />
              <WeekView
                name="work-week"
                displayName="Work Week"
                excludedDays={[0, 6]}
                startDayHour={9}
                endDayHour={19}
              />
              <MonthView />
              <DayView startDayHour={10} endDayHour={19} />

              <Toolbar />
              <ViewSwitcher />
              <Appointments />
            </SchedulerStyle>
          </Paper>
        </CardStyled>
      </ContentStyle>
      <Footer value={1} />
    </Page>
  );
}

const SchedulerStyle = styled(Scheduler)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height: 500
  }
}));

const CardStyled = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    height: 800
  }
}));
