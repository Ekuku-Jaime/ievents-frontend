import { Card, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { MHidden } from '../components/@material-extend';
import Page from '../components/Page';
import PasswordResetForm from '../components/authentication/recovery/PasswordResetForm';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
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

export default function PasswordReset() {
  return (
    <RootStyle title="Login | Minimal-UI">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            E rapido recuperar a senha!
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 3 }}>
            <Typography sx={{ color: 'text.secondary' }}>Defina uma nova senha</Typography>
          </Stack>

          <PasswordResetForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
