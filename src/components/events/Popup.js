import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import EventEdit from './EventEdit';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  }
}));
Popup.propTypes = {
  title: PropTypes.string.isRequired,

  openPopup: PropTypes.bool.isRequired,
  setOpenPopup: PropTypes.func.isRequired,
  id: PropTypes.number
};
export default function Popup(props) {
  const { title, openPopup, setOpenPopup, id } = props;
  const classes = useStyles();
  return (
    <Dialog open={openPopup} maxWidth="lg" className={classes.dialogWrapper} fullWidth>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="div">
            {title}
          </Typography>
          <Button color="primary" variant="outlined" onClick={() => setOpenPopup(false)}>
            x
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {' '}
        <EventEdit id={id} />{' '}
      </DialogContent>
    </Dialog>
  );
}
