import React from 'react';
import styled from '@emotion/styled';
// material
import { Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import EventForm from '../components/events/EventForm';

export default function EventRegister() {
  return (
    <Page title="Criar Eventos | Ievents">
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Crie um novo evento
          </Typography>
        </Stack>
        <EventForm />
      </ContentStyle>
    </Page>
  );
}

const ContentStyle = styled('div')({
  maxWidth: 980,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
});
