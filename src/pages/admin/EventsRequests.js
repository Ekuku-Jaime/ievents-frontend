import { ExpandMore, Message } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Stack,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { requestActions } from '../../actions';

const useStyles = makeStyles((theme) => ({
  input: {
    height: 120
  }
}));
export default function EventsRequests() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const RequestSchema = Yup.object().shape({
    response: Yup.string().required('Detalhe a sua resposta')
  });

  const { getRequests, acceptRequest, rejectRequest } = bindActionCreators(
    requestActions,
    dispatch
  );
  const requests = useSelector((state) => state.requests.requests);

  useEffect(() => {
    getRequests();
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      response: ''
    },
    validationSchema: RequestSchema,
    onSubmit: (values) => {
      if (status === 'accept') {
        acceptRequest(values, id);
      } else {
        rejectRequest(values, id);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const styles = useStyles();
  return (
    <Container>
      <Typography textAlign="center" sx={{ mb: 3, fontSize: '1.5rem' }}>
        Pedidos da criação de eventos
      </Typography>
      {requests?.map((request) => (
        <Accordion elevation={3} key={request.id} sx={{ mb: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Message /> <span style={{ marginLeft: '10px' }}>{request.title}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ mb: 2 }}>
              {request.description}
              <span style={{ marginTop: '16px' }}>
                Pedido por: {request?.user.nome} {request.user.apelido} Turma:{' '}
                <span style={{ textTransform: 'uppercase' }}> {request.user.turma}</span>
              </span>
            </Typography>

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

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <LoadingButton
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      onClick={() => {
                        setStatus('reject');
                        setId(request.id);
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
                        setId(request.id);
                      }}
                    >
                      Permitir
                    </LoadingButton>
                  </Stack>
                  {/* </Typography> */}
                </Stack>
              </Form>
            </FormikProvider>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
