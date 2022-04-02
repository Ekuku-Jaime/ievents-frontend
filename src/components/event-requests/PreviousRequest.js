import { ExpandMore, Message } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

PreviousRequest.propTypes = {
  requests: PropTypes.array
};

export default function PreviousRequest({ requests }) {
  return (
    <>
      {requests?.map((request) => (
        <Accordion elevation={3} key={request.id} sx={{ mb: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Message /> <span style={{ marginLeft: '10px' }}>{request.title}</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ mb: 2 }}>
              {request.description}
              {request.response}
              {request.status}

              {/* <div style={{ marginTop: '16px' }}>
                Pedido por: {request?.user.nome} {request.user.apelido}
                Turma: <span style={{ textTransform: 'uppercase' }}> {request.user.turma}</span>
              </div> */}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
