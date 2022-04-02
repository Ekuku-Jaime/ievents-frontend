import React, { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, TextareaAutosize, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import { authActions, requestActions } from '../../actions';

const useStyles = makeStyles((theme) => ({
  input: {
    height: 120
  }
}));

export default function EventRequestForm() {
  const dispatch = useDispatch();
  const { addRequest } = bindActionCreators(requestActions, dispatch);
  // const {} = bindActionCreators(authActions, dispatch)
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(user?.nome);
  }, [dispatch]);

  const RequestSchema = Yup.object().shape({
    title: Yup.string().required('Deve ter titulo'),
    description: Yup.string().required('Descreva o teu pedido')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: RequestSchema,
    onSubmit: (values) => {
      addRequest(values, user?.id);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const classes = useStyles();
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Titulo ou Assunto"
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
              inputComponent: TextareaAutosize
              // rows: 5
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Pedir
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
