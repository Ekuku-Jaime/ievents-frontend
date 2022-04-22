import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(({ breakpoints }) => ({
  body: {
    margin: 'auto',
    display: 'flex',
    minHeight: '90vh',
    color: 'red',
    backgroundColor: '#ff5722',
    opacity: '0.9',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      minHeight: '60vh'
    }
  },
  text: {
    textAlign: 'center',
    fontSize: '2.2rem',
    margin: 'auto',
    color: '#fff'
  },
  img: {
    margin: 'auto'
  },
  link: {
    display: 'inline',
    '& a': {
      color: '#fff',
      margin: '10px'
    }
  }
}));

export default function HomeHeader() {
  const styles = useStyles();
  return (
    <Box className={styles.body} sx={{ boxShadow: 1 }}>
      <div className={styles.text}>
        <div> Ter acesso aos seus enventos nunca foi tao simples </div>
        {/* <Button variant="contained" sx={{ color: '#ff5722', backgroundColor: '#fff' }}>
          Ver eventos
        </Button> */}
        <div className={styles.link}>
          <a href="facebook.com">
            <Facebook />
          </a>
          <a href="instagram.com">
            <Instagram />
          </a>
          <a href="linkedin.com">
            <LinkedIn />
          </a>
        </div>
      </div>
      <div className={styles.img}>
        <img
          src="/static/illustrations/HomeIcon.png"
          alt="home"
          style={{ height: '50vh', width: '50vh' }}
        />
        <Typography sx={{ color: '#fff', textAlign: 'center', fontSize: '2.2rem' }}>
          Os eventos cabem numa palma
        </Typography>
      </div>
    </Box>
  );
}
