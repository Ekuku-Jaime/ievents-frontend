import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { TextField, Stack, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../../actions';

export default function RegisterForm() {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { register } = bindActionCreators(authActions, dispatch);

  const RegisterSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('O primeiro nome e obrigatorio'),
    apelido: Yup.string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito longo!')
      .required('O apelido e obrigatorio'),
    turma: Yup.string()
      .min(3, 'Muito curto!')
      .max(7, 'Muito longo')
      .required('A turma e obrigatoria'),
    email: Yup.string().email('Deve ser um email valido').required('O Email e obrigatorio'),
    password: Yup.string()
      .required('Escreva uma senha')
      .min(8, 'Senha muito curta - deve conter no minimo 8 caracteres.')
      .matches(/(?=.*[0-9])/, 'A senha deve ter um numero.'),
    re_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      .required('Escreva uma senha.')
      .min(8, 'Senha muito curta - deve conter no minimo 8 caracteres.')
      .matches(/(?=.*[0-9])/, 'A senha deve ter um numero.')
  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      apelido: '',
      codigo: '',
      turma: '',
      email: '',
      password: '',
      re_password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      //   navigate("/dashboard", { replace: true });
      register(values);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nome"
              {...getFieldProps('nome')}
              error={Boolean(touched.nome && errors.nome)}
              helperText={touched.nome && errors.nome}
            />

            <TextField
              fullWidth
              label="Apelido"
              {...getFieldProps('apelido')}
              error={Boolean(touched.apelido && errors.apelido)}
              helperText={touched.apelido && errors.apelido}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Codigo de estudante"
              {...getFieldProps('codigo')}
              error={Boolean(touched.nome && errors.nome)}
              helperText={touched.nome && errors.nome}
            />

            <TextField
              fullWidth
              label="Turma"
              {...getFieldProps('turma')}
              error={Boolean(touched.turma && errors.turma)}
              helperText={touched.turma && errors.turma}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Confirmar senha"
              {...getFieldProps('re_password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.re_password && errors.re_password)}
              helperText={touched.re_password && errors.re_password}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Criar Conta
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
