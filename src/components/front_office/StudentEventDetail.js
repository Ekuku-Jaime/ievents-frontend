import styled from '@emotion/styled';
import { CalendarToday, Event, LocationOn, Person, TimelapseOutlined } from '@mui/icons-material';
import { Container, Divider, Grid, ImageListItem, Paper, Typography } from '@mui/material';
import { Image } from 'mui-image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import moment from 'moment/min/moment-with-locales';
import { eventActions, imageActions } from '../../actions/index';
import Page from '../Page';
import Layout from './Layout';
import Footer from '../../layouts/Footer';

export default function StudentEventDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const { getEvent } = bindActionCreators(eventActions, dispatch);
  const { getImages } = bindActionCreators(imageActions, dispatch);
  const images = useSelector((state) => state.images.images);
  const imagens = images?.filter((img) => img.evento === Number(params.id));

  useEffect(() => {
    getEvent(params.id);

    getImages();
    // eslint-disable-next-line
  }, []);
  //   const images = useSelector((state) => state.images.images);
  const evento = useSelector((state) => state.events);
  //   const imagens = images?.filter((img) => img.evento === 3);
  moment.locale('pt');

  return (
    <Page title="Detalhes do evento |Ievents">
      <Layout />
      <Container sx={{ mt: 10 }}>
        <Typography variant="h3" textAlign="center" color="GrayText" sx={{ mb: 2 }}>
          {evento[params.id]?.title}
        </Typography>
        <Paper sx={{ mb: 4 }}>
          <Image src={evento[params.id]?.image} />

          <Divider variant="midle" />
          <Grid container mb={2}>
            <Grid item md={6}>
              <Typography variant="h6" mt={2}>
                Detalhes
              </Typography>
              <DetailDesc>
                <div style={{ display: 'flex' }}>
                  <CalendarToday />{' '}
                  <span style={{ fontSize: '16px', textTransform: 'capitalize' }}>
                    Data do inicio: {moment(evento[params.id]?.initial_date).format('LLL')}
                  </span>
                </div>
                <div style={{ display: 'flex', marginTop: '16px' }}>
                  <TimelapseOutlined />{' '}
                  <span style={{ fontSize: '16px', textTransform: 'capitalize' }}>
                    Data do fim: {moment(evento[params.id]?.end_date).format('LLL')}
                  </span>
                </div>
                <div style={{ display: 'flex', marginTop: '8px' }}>
                  <LocationOn />
                  <span> Local : {evento[params.id]?.local}</span>
                </div>
                <div style={{ display: 'flex', marginTop: '8px' }}>
                  <Event />
                  <span> Tipo : {evento[params.id]?.type}</span>
                </div>
                {evento[params.id]?.type === 'Defesa' ? (
                  <div style={{ display: 'flex', marginTop: '8px' }}>
                    <Person />
                    <span> Nome do estudante : {evento[params.id]?.student_name}</span>
                  </div>
                ) : (
                  ''
                )}
                {evento[params.id]?.type === 'Palestra' ? (
                  <div style={{ display: 'flex', marginTop: '8px' }}>
                    <Person />
                    <span> Painelista : {evento[params.id]?.panelist}</span>
                  </div>
                ) : (
                  ''
                )}
              </DetailDesc>
            </Grid>
            <Grid item md={6} mt={2}>
              <Typography variant="h6" mt={2}>
                Descrição
              </Typography>
              <Typography textAlign="justify">{evento[params.id]?.description}</Typography>
            </Grid>
          </Grid>
          {imagens.length > 0 ? (
            <Typography
              variant="h4"
              sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', mb: 2 }}
            >
              Imagens do evento
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', mb: 2 }}
            >
              Ainda não se adicionou imagens
            </Typography>
          )}

          <ImageGalleryList sx={{ width: 500, height: 450, mb: 2 }} cols={3} rowHeight={164}>
            {imagens &&
              imagens.map((item) => (
                <ImageListItem key={item.id}>
                  <img src={item.image} srcSet={item.image} alt="imagem do evento" loading="lazy" />
                </ImageListItem>
              ))}
          </ImageGalleryList>
        </Paper>

        <Paper elevation={3} />
      </Container>
      <Footer value={0} />
    </Page>
  );
}

const DetailDesc = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1rem',
  marginTop: '10px',
  '& span': {
    paddingLeft: '10px'
  }
});

const ImageGalleryList = styled('ul')(({ theme }) => ({
  display: 'grid',
  padding: 0,
  margin: theme.spacing(0, 4),
  gap: 8,
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
}));
