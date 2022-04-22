import { Card, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import EmailConfirmForm from '../components/authentication/recovery/EmailConfirmForm';
import { MHidden } from '../components/@material-extend';
import Page from '../components/Page';

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

export default function EmailConfirm() {
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
            <Typography sx={{ color: 'text.secondary' }}>
              Ensira o email que usou para criacao da conta.
            </Typography>
          </Stack>

          <EmailConfirmForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
