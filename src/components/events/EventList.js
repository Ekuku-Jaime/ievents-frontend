import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from '../Page';
import DefesaList from './DefesaList';
import PalestraList from './PalestraList';
import SeminaryList from './SeminaryList';
import GraduacaoList from './GraduacaoList';

import { eventActions } from '../../actions';

export default function EventList() {
  const [eventType, setEventType] = useState(1);

  const handleChange = (event) => {
    setEventType(event.target.value);
  };

  const dispatch = useDispatch();

  const { getEvents, deleteEvent } = bindActionCreators(eventActions, dispatch);
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteEvent(id);
  };

  return (
    <Page title="Palestras | Ievents">
      <Container>
        <FormControl fullWidth mb={5}>
          <InputLabel id="demo-simple-select-label">Selecione o tipo de evento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eventType}
            label="Selecione o tipo de evento"
            onChange={handleChange}
          >
            <MenuItem value={1}>Palestra</MenuItem>
            <MenuItem value={2}>Defesa</MenuItem>
            <MenuItem value={3}>Seminario</MenuItem>
            <MenuItem value={4}>Graduacao</MenuItem>
          </Select>
        </FormControl>
        <div>
          {eventType === 1 && <PalestraList events={events} deleteEvent={handleDelete} />}
          {eventType === 2 && <DefesaList events={events} deleteEvent={deleteEvent} />}
          {eventType === 3 && <SeminaryList events={events} deleteEvent={deleteEvent} />}
          {eventType === 4 && <GraduacaoList events={events} deleteEvent={deleteEvent} />}
        </div>
      </Container>
      <Outlet />
    </Page>
  );
}
