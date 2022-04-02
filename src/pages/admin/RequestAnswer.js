import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { requestActions } from '../../actions';

RequestAnswer.propTypes = {
  accept: PropTypes.func,
  reject: PropTypes.func
};
const useStyles = makeStyles((theme) => ({
  input: {
    height: 120
  }
}));
export default function RequestAnswer({ accept, reject }) {
  const [status, setStatus] = useState('');
  const RequestSchema = Yup.object().shape({
    response: Yup.string().required('Detalhe a sua resposta')
  });

  const formik = useFormik({
    initialValues: {
      response: ''
    },
    validationSchema: RequestSchema,
    onSubmit: (values) => {
      if (status === 'accept') {
        accept(values);
      } else {
        reject(values);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const styles = useStyles();
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            multiline
            label="Descricao"
            {...getFieldProps('response')}
            error={Boolean(touched.response && errors.response)}
            helperText={touched.response && errors.response}
            InputProps={{
              className: styles.input,
              inputComponent: TextareaAutosize,
              rows: 5
            }}
          />
          {/* <Typography sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}> */}
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between' }}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={() => {
                setStatus('reject');
              }}
            >
              Recusar
            </LoadingButton>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={() => {
                setStatus('accept');
              }}
            >
              Permitir
            </LoadingButton>
          </Stack>
          {/* </Typography> */}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
