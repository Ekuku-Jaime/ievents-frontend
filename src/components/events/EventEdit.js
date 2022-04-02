import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DateTimePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import moment from 'moment';

import MSelect from './MSelect';
import * as eventsServices from './services/eventsServices';

import { eventActions } from '../../actions/index';

const useStyles = makeStyles({
  input: {
    height: 120
  }
});

EventEdit.propTypes = {
  id: PropTypes.number
};

export default function EventEdit({ id }) {
  const [mk, setMk] = useState({
    title: '',
    description: '',
    studentName: '',
    image: '',
    type: '',
    initialDate: new Date(),
    endDate: new Date(),
    panelist: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editEvent } = bindActionCreators(eventActions, dispatch);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
  );

  useEffect(() => {
    // getEvents();
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    // eslint-disable-next-line
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${id}`)
      .then((res) => {
        const { title, description, studentName, image, type, initialDate, endDate, panelist } =
          res.data;
        setMk({ title, description, studentName, image, type, initialDate, endDate, panelist });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito Longo!')
      .required('O titulo e obrigatorio'),
    type: Yup.string().required('Selecione o type'),
    description: Yup.string()
      .min(15, 'Muito curta')
      .max(500, 'Muito longa')
      .required("A description e' obrigatoria"),
    initialDate: Yup.string().required('Selecione a data'),
    endDate: Yup.string().required('Selecione a data')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...mk },

    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      editEvent(id, values);
      navigate('/dashboard/events', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const classes = useStyles();
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    formik.setFieldValue('image', e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  return (
    <FormikProvider value={formik} enableReinitialize>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Title"
              {...getFieldProps('title')}
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title}
            />

            <TextField
              fullWidth
              multiline
              label="Descricao"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
              InputProps={{
                className: classes.input,
                inputComponent: TextareaAutosize,
                rows: 5
              }}
            />

            <Stack direction="row" mb={2}>
              <Typography variant="body1" gutterBottom>
                Imagem
                {!selectedFile && (
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      mb: 2
                    }}
                    alt="The house from the offer."
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    // src={preview}
                  />
                )}
                {selectedFile && (
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      mb: 2
                    }}
                    alt="The house from the offer."
                    // src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    src={preview}
                  />
                )}
                <Button variant="contained" component="label" fullWidth>
                  Carregar imagem
                  <input type="file" hidden onChange={onSelectFile} />
                  {/* {selectedFile && <img src={preview} alt="hooo" />} */}
                </Button>
              </Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <DateTimePicker
                label="Data de inicio"
                onChange={(val) => {
                  const date = moment(val).format();

                  formik.setFieldValue('initialDate', date);
                }}
                value={formik.values.initialDate}
                renderInput={(params) => (
                  <TextField
                    // {...getFieldProps('initialDate')}
                    fullWidth
                    {...params}
                    error={Boolean(touched.initialDate && errors.initialDate)}
                    helperText={touched.initialDate && errors.initialDate}
                  />
                )}
              />

              <DateTimePicker
                label="Data do termino"
                onChange={(val) => {
                  const data = moment(val).format();

                  formik.setFieldValue('endDate', data);
                }}
                value={formik.values.endDate}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={Boolean(touched.endDate && errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                  />
                )}
              />
            </Stack>
            <MSelect
              fullWidth
              name="type"
              {...getFieldProps('type')}
              label="Tipo de evento"
              // value={formik.values.type}
              options={eventsServices.getEventsTypes()}
              // onChange={handleInputChange}
              error={Boolean(touched.type && errors.type)}
              helperText={touched.type && errors.type}
            />
            {formik.values.type === 'Palestra' && (
              <TextField
                fullWidth
                label="Nome do palestrante"
                {...getFieldProps('panelist')}
                error={Boolean(touched.panelist && errors.panelist)}
                helperText={touched.panelist && errors.panelist}
              />
            )}
            {formik.values.type === 'Defesa' && (
              <TextField
                fullWidth
                label="Nome do estudante"
                {...getFieldProps('studentName')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
            )}
            {formik.values.type === 'Graduacao' && (
              <TextField
                fullWidth
                label="Local do evento"
                {...getFieldProps('local')}
                error={Boolean(touched.local && errors.local)}
                helperText={touched.local && errors.local}
              />
            )}
            {formik.values.type === 'Seminario' && (
              <DateTimePicker
                label="Data do termino"
                onChange={(val) => {
                  const date = moment(val).format();

                  formik.setFieldValue('endDate', date);
                }}
                value={formik.values.endDate}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={Boolean(touched.endDate && errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                  />
                )}
              />
            )}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {formik.values.title === '' ? 'Criar' : 'Editar'}
            </LoadingButton>
          </Stack>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
}
