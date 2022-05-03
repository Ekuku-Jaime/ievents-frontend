import { AddBox } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/min/moment-with-locales';
import { useAlert } from 'react-alert';

import { userEventsActions } from '../../actions';
import { truncate } from '../events/services/eventsHelpers';

CardEvent.propTypes = {
  event: PropTypes.object,
  user: PropTypes.number,
  userEvents: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    width: 300,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    marginTop: spacing(1),

    [breakpoints.up('lg')]: {
      flexDirection: 'row',
      paddingTop: spacing(1),
      width: 500
    },
    [breakpoints.down('xl')]: {
      // flexDirection: 'row',
      paddingTop: spacing(1),
      [breakpoints.down('lg')]: {
        paddingTop: spacing(1),
        width: 500
      },

      [breakpoints.up('md')]: {
        flexDirection: 'row',
        paddingTop: spacing(1),
        width: 400,
        marginLeft: spacing(2)
      },
      [breakpoints.down('sm')]: {
        paddingTop: spacing(1),
        width: 300,
        marginLeft: spacing(2)
      },
      [breakpoints.up('sm')]: {
        flexDirection: 'row',
        paddingTop: spacing(1),
        width: 400
      }
    }
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('sm')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)'
    },
    [breakpoints.up('md')]: {
      width: '200%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)'
    },
    [breakpoints.up('lg')]: {
      width: '150%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)'
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5
    }
  },

  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial'
  }
}));
moment.locale('pt');
export default function CardEvent({ event, userEvents, user, isAuthenticated }) {
  const navigate = useNavigate();
  const alert = useAlert();
  const styles = useStyles();
  const dispatch = useDispatch();

  const { addUserEvent } = bindActionCreators(userEventsActions, dispatch);
  // check if event is already asinged to the user
  const checkEvent = (id) => {
    const even = userEvents.filter((eve) => eve?.evento.id === id && eve?.user === user);

    if (even.length > 0) {
      return true;
    }
    return false;
  };
  const initialDate = new Date(event.initial_date);
  const endDate = new Date(event.end_date);
  // check if has same day and month
  const isSameDay = () => {
    if (
      initialDate.getMonth() === endDate.getMonth() &&
      initialDate.getDay() === endDate.getDay()
    ) {
      return true;
    }
    return false;
  };
  const today = new Date();
  const eventDate = (date) => new Date(date);
  return (
    <Card className={styles.root}>
      <CardMedia className={styles.media} image={event.image} width="300px" />
      <CardContent>
        {/* <TextInfoContent */}
        {/* classes={contentStyles} */}{' '}
        <Typography textAlign="left" fontSize="1rem">
          {/* {truncate(event.title, 35)} */}
          {event.title}
        </Typography>
        <div style={{ color: '#e64a19', fontSize: '0.8rem' }}>
          {moment(event.initial_date).format('lll')}-
          {isSameDay() ? moment(event.end_date).format('LT') : moment(event.end_date).format('lll')}
        </div>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
          component={RouterLink}
          to={`event/detail/${event.id}`}
        >
          Ver Mais
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {today > eventDate(event.end_date) ? (
            ''
          ) : (
            <Tooltip title="guardar no calendario">
              <IconButton
                color="primary"
                onClick={() => {
                  if (checkEvent(event.id) === true) {
                    alert.error('Ja adicionou este evento');
                  }
                  if (isAuthenticated === false) {
                    setTimeout(() => {
                      alert.error('por favor autentique-se primeiro');
                    }, 500);
                    navigate('/login', { replace: true });
                  } else if (checkEvent(event.id) === false && isAuthenticated === true) {
                    setTimeout(() => {
                      addUserEvent(Number(event.id), user);
                    }, 300);
                    alert.success('Evento adicionado com sucesso');
                  }
                }}
              >
                <AddBox fontSize="large" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="partilhar">
            <WhatsappShareButton url={`https://iscimevents.netlify.app/event/detail/${event.id}`}>
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}
