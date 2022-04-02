import React, { useState } from 'react';
import EventForm from './EventForm';

export default function DefesaCreate() {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    studentName: '',
    image: '',
    type: '',
    initialDate: null,
    endDate: null,
    panelist: ''
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return <EventForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize />;
}
