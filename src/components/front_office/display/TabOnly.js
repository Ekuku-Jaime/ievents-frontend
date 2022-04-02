import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CardEvent from '../CardEvent';

TabOnly.propTypes = {
  events: PropTypes.array,
  user: PropTypes.number,
  userEvents: PropTypes.array,
  isAuthenticated: PropTypes.bool
};
function isEmpty(event) {
  if (typeof event !== 'undefined' && event.length > 0) {
    return false;
  }
  return true;
}
export default function TabOnly({ events, user, userEvents, isAuthenticated }) {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'block', md: 'none' }
      }}
    >
      {isEmpty(events) ? (
        ''
      ) : (
        <div>
          {' '}
          {events.map((ev) => (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center'
              }}
              key={ev.id}
            >
              <CardEvent
                event={ev}
                user={user}
                userEvents={userEvents}
                isAuthenticated={isAuthenticated}
              />
            </div>
          ))}
        </div>
      )}
    </Box>
  );
}
