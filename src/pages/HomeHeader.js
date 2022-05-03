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
        <div> Ter acesso aos eventos nunca foi tão simples </div>

        <div className={styles.link}>
          <a href="https://facebook.com/iscim.moz" rel="noopener noreferrer" target="_blank">
            <Facebook />
          </a>
          <a
            href="https://www.instagram.com/explore/locations/222798738/iscim-instituto-superior-de-comunicacao-e-imagem-de-mocambique?hl=pt"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Instagram />
          </a>
          <a href="https://linkedin.com" rel="noopener noreferrer" target="_blank">
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
