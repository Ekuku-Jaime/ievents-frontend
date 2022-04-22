import styled from '@emotion/styled';
import { Card, Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import Nav from '../components/front_office/Nav';
import EventRequestForm from '../components/event-requests/EventRequestForm';
import Page from '../components/Page';
import Layout from '../components/front_office/Layout';
import { requestActions } from '../actions';
import PreviousRequest from '../components/event-requests/PreviousRequest';
import Footer from '../layouts/Footer';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function EventRequest() {
  const dispatch = useDispatch();
  const { getRequests } = bindActionCreators(requestActions, dispatch);

  const requests = useSelector((state) => state.requests.requests);

  useEffect(() => {
    getRequests();
  }, [dispatch]);
  return (
    <RootStyle title="Pedidos|Ievents">
      <Layout />
      <Container>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
              Faça um pedido para que se aprove um evento que você deseja organizar.
            </Typography>
          </Stack>
          <EventRequestForm />
          {requests?.length !== 0 ? (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                Seus antigos eventos
              </Typography>
              <PreviousRequest requests={requests} />
            </div>
          ) : (
            <Typography variant="h5" sx={{ color: 'text.secondary', mt: 3 }}>
              Ainda não fez nenhum pedido
            </Typography>
          )}
        </ContentStyle>
      </Container>
      <Footer value={2} />
    </RootStyle>
  );
}
