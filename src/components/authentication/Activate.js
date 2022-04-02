import { transform, values } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Container, Typography } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { styled } from '@mui/styles';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../actions';
import Page from '../Page';

Activate.propTypes = {};

export default function Activate() {
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const { verify } = bindActionCreators(authActions, dispatch);
  const params = useParams();
  const verifyAccount = (e) => {
    const { uid } = params;
    const { token } = params;

    verify(uid, token);
    setVerified(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (verified) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [verified]);

  return (
    <RootStyle title="Activar Conta | IEvents">
      <Container>
        <ContentMain>
          <Typography variant="body1" fontSize="2rem" textAlign="justify">
            Bem Vindo ao Gestor de Eventos do ISCIM
          </Typography>
          <Typography fontSize="1.5rem" textAlign="justify" sx={{ mt: 2 }}>
            Fique a par de todos os eventos que serao realizados em ter que sair de casa{' '}
          </Typography>
          <Typography fontSize="1rem" sx={{ mt: 1 }}>
            <div>
              Clique no botao abaixo para verificar a sua conta <DragIndicator />
            </div>
          </Typography>
          <StyledButton onClick={verifyAccount}>Verificar</StyledButton>
        </ContentMain>
      </Container>
    </RootStyle>
  );
}

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px'
});

const ContentMain = styled('div')(({ theme }) => ({
  maxWidth: 580,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));
const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex'
  //   position: 'relative'
}));
