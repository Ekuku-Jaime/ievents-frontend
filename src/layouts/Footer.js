import React from 'react';
import { EventNote, HomeOutlined, Person, Settings } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { MHidden } from '../components/@material-extend';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    overflowX: 'scroll',
    flexShrink: 0,
    flexWrap: 'nowrap',
    padding: '20px 0'
  }
});

export default function Footer({ value }) {
  // const [value, setValue] = React.useState(0);
  const styles = useStyles();
  return (
    <footer className={styles.root}>
      <MHidden width="mdUp">
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={1}>
          <BottomNavigation showLabels value={value}>
            <BottomNavigationAction
              component={RouterLink}
              to="/"
              label="Home"
              icon={<HomeOutlined />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/meuseventos"
              label="Eventos"
              icon={<EventNote />}
            />
            <BottomNavigationAction
              component={RouterLink}
              to="/pedido"
              label="Pedidos"
              icon={<Settings />}
            />
          </BottomNavigation>
        </Paper>
      </MHidden>
    </footer>
  );
}
