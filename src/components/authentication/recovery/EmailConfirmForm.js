import React from 'react';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { authActions } from '../../../actions';

export default function EmailConfirmForm() {
  const dispatch = useDispatch();
  const { resetPassword } = bindActionCreators(authActions, dispatch);
  const err = useSelector((state) => state.errors);
  const alert = useAlert();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('O enderenco de elecronico deve ser valido')
      .required('Email e obrigatorio')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        resetPassword(values);
        if (!err) {
          <Navigate to="passwordconfirm" />;
        }
        // setSubmitting(true);
      }, 500);

      alert.error('Email incorrecto');
      setSubmitting(false);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Confirmar Email
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
