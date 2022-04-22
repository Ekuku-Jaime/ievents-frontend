import React, { useEffect, useRef } from 'react';
import { withAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

Alerts.propTypes = {
  alert: PropTypes.any
};

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Alerts({ alert }) {
  const err = useSelector((state) => state.errors);
  const message = useSelector((state) => state.messages);
  const msg = usePrevious(message);
  const error = usePrevious(err);
  // if (err !== 'undefined') {
  //   if (error?.message.message) {
  //     alert.error(error?.message.message.detail);
  //   }
  //   if (error?.message.status) {
  //     alert.error(error.message.message.status);
  //   }
  // }
  if (msg !== 'undefined') {
    if (msg?.diaryAdded) {
      alert.success(msg.diaryAdded);
    }
    if (msg?.eventDeleted) {
      alert.success(msg.eventDeleted);
    }
    if (msg?.requestLoaded) {
      alert.success(msg.requestLoaded);
    }
  }

  return <></>;
}

export default withAlert()(Alerts);
