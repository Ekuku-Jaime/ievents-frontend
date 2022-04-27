import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import styled from '@emotion/styled';
import { Login as LoginIcon, Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MHidden } from '../@material-extend';
import { authActions } from '../../actions';
import Logo from '../Logo';

const useStyles = makeStyles(() => ({
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
    width: '80px',
    height: '80px'
  },
  root: {
    backgroundColor: 'transparent',
    transform: 'translateZ(0)'
  }
}));

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  // }
  marginBottom: '100px'
}));

const ResponsiveAppBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const { logout } = bindActionCreators(authActions, dispatch);
  const guestLinks = () => (
    <MenuItem component={RouterLink} to="/login">
      <Typography textAlign="center" sx={{ display: 'flex' }}>
        <LoginIcon /> Entrar
      </Typography>
    </MenuItem>
  );
  const authLinks = () => (
    // aux.map((page) => (
    //   <MenuItem component={RouterLink} to={page.link} key={page.id}>
    //     <Typography textAlign="center" sx={{ display: 'flex' }}>
    //       <Person />
    //       {page.name}
    //     </Typography>
    //   </MenuItem>
    // ))
    <MenuItem
      onClick={() => {
        logout();
      }}
    >
      <Typography textAlign="center" sx={{ display: 'flex' }}>
        <Person /> Sair
      </Typography>
    </MenuItem>
  );

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const styles = useStyles();

  return (
    // <AppBar position="fixed" className={styles.root} elevation={0}>
    <RootStyle>
      <MHidden width="mdDown">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
                <Logo />
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, display: 'block', fontSize: '1.2rem' }}
                component={RouterLink}
                to="/meuseventos"
              >
                Meus eventos
              </Button>
              <Button
                sx={{ my: 2, display: 'block', fontSize: '1.2rem' }}
                component={RouterLink}
                to="/pedido"
              >
                Pedidos
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/illustrations/avatar_default.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAuthenticated ? authLinks() : guestLinks()}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </MHidden>
    </RootStyle>
  );
};
export default function Nav() {
  return <ResponsiveAppBar />;
}
