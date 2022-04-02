import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CardEvent from '../CardEvent';

TabDeskEvent.propTypes = {
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
export default function TabDeskEvent({ events, user, userEvents, isAuthenticated }) {
  // const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <Box sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
        {/* {lectures.length>0} */}

        <>
          {isEmpty(events) ? (
            ' '
          ) : (
            <div>
              {events.length === 1 ? (
                <div>
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
                        user={Number(user)}
                        events={user}
                        isAuthenticated={isAuthenticated}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                  {events.map((event) => (
                    <div
                      key={event.id}
                      style={{ display: 'flex', marginLeft: '4.7%', marginTop: '4%' }}
                    >
                      <CardEvent
                        event={event}
                        user={Number(user)}
                        userEvents={userEvents}
                        isAuthenticated={isAuthenticated}
                      />
                    </div>
                  ))}
                </Stack>
              )}
            </div>
          )}
        </>
      </Box>
    </Container>
  );
}
