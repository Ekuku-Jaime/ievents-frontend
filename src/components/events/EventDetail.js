import styled from '@emotion/styled';
import {
  ArrowLeft,
  ArrowRight,
  CalendarToday,
  Event,
  LocationOn,
  Person,
  TimelapseOutlined
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  ImageListItem,
  Paper,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Formik } from 'formik';
import moment from 'moment/min/moment-with-locales';
import { Image } from 'mui-image';
import React, { useEffect, useState } from 'react';
import { DropZone, Form } from 'react-formik-ui';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { eventActions, imageActions, minutedActions } from '../../actions/index';

const EventDetail = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const dispatch = useDispatch();
  const { addEventImages, getImages } = bindActionCreators(imageActions, dispatch);
  const { getEvent } = bindActionCreators(eventActions, dispatch);
  const { addMinuted, getMinuteds } = bindActionCreators(minutedActions, dispatch);

  const classes = useStyles();
  const params = useParams();
  const evento = useSelector((state) => state.events);
  const images = useSelector((state) => state.images.images);
  const imagens = images?.filter((img) => img.evento === Number(params.id));
  const minuted = useSelector((state) =>
    state.minuted.minuteds?.filter((minuted) => minuted.event === Number(params.id))
  );

  useEffect(() => {
    getEvent(params.id);
    getMinuteds();
    getImages();
    // eslint-disable-next-line
  }, [dispatch]);
  moment.locale('pt');
  return (
    <Container>
      <Typography variant="h3" textAlign="center" color="GrayText">
        {evento[params.id]?.title}
      </Typography>
      <Divider />
      <Paper>
        <Paper>
          <Image src={evento[params.id]?.image} />
          {/* <img src={evento[params.id]?.image} alt="Evento" height="80%" width="80%" /> */}
        </Paper>
        <Divider variant="midle" />
        <Grid container mb={2}>
          <Grid item md={6} xs={12}>
            <Typography variant="h6" mt={2}>
              Detalhes
            </Typography>
            <DetailDesc>
              <div style={{ display: 'flex' }}>
                <CalendarToday />{' '}
                <span>
                  Data do inicio :{' '}
                  <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                    {moment(evento[params.id]?.initial_date).format('LLL')}
                  </span>
                </span>
              </div>
              <div style={{ display: 'flex', marginTop: '8px' }}>
                <TimelapseOutlined />{' '}
                <span>
                  Data do fim :{' '}
                  <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                    {moment(evento[params.id]?.end_date).format('LLL')}
                  </span>
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
          <Grid item md={6} mt={2} xs={12}>
            <Typography variant="h6">
              Descricao
              <Typography textAlign="justify">{evento[params.id]?.description}</Typography>
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', mb: 2 }}
        >
          Imagens do evento
        </Typography>
        <ImageGalleryList sx={{ width: 500, height: 450, mb: 2 }} cols={3} rowHeight={164}>
          {imagens &&
            imagens.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.image} srcSet={item.image} alt="imagem do evento" loading="lazy" />
              </ImageListItem>
            ))}
        </ImageGalleryList>
        <Formik
          initialValues={{
            files1: []
          }}
          onSubmit={(data) => {
            addEventImages(evento[params.id].id, data);
            window.location.reload();
          }}
        >
          <Form>
            <div className={classes.body}>
              <Box sx={{ boxShadow: 3 }}>
                <DropZone
                  className={classes.body}
                  name="files1"
                  placeholder="Tente puxar imagens para aqui ou carregue-as"
                  accept="image/*"
                />
              </Box>
            </div>

            <Button type="submit" variant="contained" fullWidth>
              Guardar
            </Button>
          </Form>
        </Formik>

        {minuted[0]?.minuted && (
          <Box>
            <Typography variant="h3" textAlign="center">
              Acta
            </Typography>
            <DocumentStyled
              file={minuted[0]?.minuted}
              // eslint-disable-next-line
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </DocumentStyled>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="pagec">
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
              </div>
              <div>
                <IconButton
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={() => {
                    previousPage();
                  }}
                >
                  <ArrowLeft fontSize="large" />
                </IconButton>

                <IconButton
                  disabled={pageNumber >= numPages}
                  onClick={() => {
                    nextPage();
                  }}
                >
                  <ArrowRight fontSize="large" />
                </IconButton>
              </div>
            </div>
          </Box>
        )}
        {!minuted[0]?.minuted && (
          <Formik
            initialValues={{
              files2: []
            }}
            onSubmit={(data) => {
              addMinuted(data, params.id);
            }}
          >
            <Form>
              <div>
                <Box sx={{ boxShadow: 3 }}>
                  <div className={classes.body}>
                    <DropZone
                      name="files2"
                      placeholder="Puxe a acta para aqui ou clique para adicionar"
                      accept=".pdf"
                    />
                  </div>
                </Box>
              </div>

              <Button type="submit" variant="contained" fullWidth>
                Guardar
              </Button>
            </Form>
          </Formik>
        )}
      </Paper>
    </Container>
  );
};

const DocumentStyled = styled(Document)(({ theme }) => ({
  '& .react-pdf__Page__canvas': {
    // margin: '0 auto',
    width: '80% !important',
    height: '100% !important',
    position: 'static'
  },
  [theme.breakpoints.down('sm')]: {
    '& .react-pdf__Page__canvas': {
      margin: '0 auto',
      width: '100% !important',
      height: '100% !important',
      position: 'inherit'
    }
  }
}));

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
const useStyles = makeStyles({
  body: {
    border: 'none',
    margin: '20px 0 20px',
    input: {
      height: 400,
      backgroundRepeat: 'no-repeat'
    },

    '& .dropzone ': {
      height: '200px !important',
      border: 'none !important',
      // eslint-disable-next-line no-useless-concat
      backgroundImage: 'url(' + '/static/icons/dropbox.png' + ')',
      backgroundRepeat: 'no-repeat'
      // backgroundImage: '"/static/mock-images/avatars/avatar_default.jpg"',
    }
  }
});
const DetailDesc = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1rem',
  marginTop: '10px',
  '& span': {
    paddingLeft: '10px'
  }
});

export default EventDetail;
