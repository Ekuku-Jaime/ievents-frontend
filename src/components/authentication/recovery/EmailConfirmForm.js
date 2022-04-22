import React from 'react';
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

export default function EmailConfirmForm() {
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
        console.log();
      }, 500);
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
