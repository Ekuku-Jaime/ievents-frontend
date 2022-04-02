import React from 'react';
import MyEvents from '../components/front_office/MyEvents';
import Footer from '../layouts/Footer';

export default function UserEvents() {
  return (
    <>
      <MyEvents />
      <div style={{ position: 'fixed' }}>
        <Footer value={1} />
      </div>
    </>
  );
}
