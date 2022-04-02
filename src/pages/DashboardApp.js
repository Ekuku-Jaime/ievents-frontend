// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Page from '../components/Page';
import AnualEvents from '../components/_dashboard/app/AnualEvents';
import MonthlyEvents from '../components/_dashboard/app/MonthlyEvents';

// actions
import { eventActions } from '../actions';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();

  const { getEvents } = bindActionCreators(eventActions, dispatch);
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    if (events.length === 0) {
      getEvents();
    }
  }, [dispatch]);

  return (
    <Page title="Dashboard | IEvents">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ola, Bem vindo de novo</Typography>
        </Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            <MonthlyEvents events={events} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AnualEvents events={events} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
