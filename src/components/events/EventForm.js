import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// Yup
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { DateTimePicker, LoadingButton, LocalizationProvider } from '@mui/lab';

import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import moment from 'moment';

import MSelect from './MSelect';
import * as eventsServices from './services/eventsServices';

import { eventActions } from '../../actions/index';

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
  input: {
    height: 120
  }
}));
export default function EventForm() {
  // const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const { addEvent } = bindActionCreators(eventActions, dispatch);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2'
  );

  useEffect(() => {
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

  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Muito curto!').max(250, 'Muito Longo!').required('Insira o titulo'),
    local: Yup.string().min(2, 'Muito curto!').max(120, 'Muito longo!').required('Insera o local'),
    type: Yup.string().required('Selecione o tipo de evento'),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    description: Yup.string()
      .min(15, 'Muito curta')
      .max(700, 'Muito longa')
      .required("A descricao e' obrigatoria"),
    initialDate: Yup.date().required('Selecione a data'),
    endDate: Yup.date()
      .required('Selecione a data')
      .default(null)
      .when(
        'initialDate',
        (initialDate, yup) =>
          initialDate && yup.min(initialDate, 'O evento nao pode terminar antes do fim')
      )
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      studentName: '',
      image: '',
      type: '',
      initialDate: '',
      endDate: null,
      panelist: '',
      local: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        addEvent(values);
        setSubmitting(false);
      }, 500);
      navigate('/dashboard/events/new', { replace: true });
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
    <div>
      <FormikProvider value={formik}>
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
                Criar
              </LoadingButton>
            </Stack>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      <Outlet />
    </div>
  );
}
