import { makeStyles } from '@mui/styles';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useScroll } from 'react-use-gesture';
import PropTypes from 'prop-types';
import CardEvent from '../CardEvent';
import { MHidden } from '../../@material-extend';

MobileEvent.propTypes = {
  events: PropTypes.array,
  user: PropTypes.number,
  userEvents: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
    height: '60px'
  },
  container: {
    display: 'flex',
    // flexDirection: 'row',
    overflowX: 'scroll',
    flexShrink: 0,
    flexWrap: 'nowrap',
    padding: '20px 0'
  }
});

export default function MobileEvent({ events, user, userEvents, isAuthenticated }) {
  const [style, set] = useSpring(() => ({
    transform: 'perspective(500px) rotateY(0deg)'
  }));
  // const style = useSpring({
  //   from: {
  //     transform: 'perspective(500px) rotateY(0deg)'
  //   },
  //   transform: 'perspective(500px) rotateY(25deg)'
  // });

  const styles = useStyles();
  const clamp = (value, clampAt) => {
    clampAt = 30;
    if (value > 0) {
      return value > clampAt ? clampAt : value;
    }
    return value < -clampAt ? -clampAt : value;
  };
  const bind = useScroll((event) => {
    set({
      transform: `perspective(500px) rotateY(${event.scrolling ? clamp(event.delta[0]) : 0}deg)`
    });
  });

  function isEmpty(event) {
    if (typeof event !== 'undefined' && event.length > 0) {
      return false;
    }
    return true;
  }
  return (
    <MHidden width="smUp">
      {isEmpty(events) ? (
        ''
      ) : (
        <div className={styles.container} {...bind()}>
          {events.map((ev) => (
            <animated.div key={ev.id} style={{ ...style }}>
              <CardEvent
                event={ev}
                user={user}
                userEvents={userEvents}
                isAuthenticated={isAuthenticated}
              />
            </animated.div>
          ))}
        </div>
      )}
    </MHidden>
  );
}
