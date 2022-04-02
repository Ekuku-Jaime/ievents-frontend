import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Button, Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Edit, DeleteOutline, InfoRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Popup from './Popup';
import { status, truncate } from './services/eventsHelpers';

SeminaryList.propTypes = {
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func
};

export default function SeminaryList({ events, deleteEvent }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [eventId, setEventId] = useState(null);

  const graduationEvents = events.filter((evento) => evento.type === 'Graduacao');

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Eliminar evento',
      message: 'Dejesa realmente eliminar este evento?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteEvent(id)
        },
        {
          label: 'Não',
          onClick: () => alert('Click No')
        }
      ]
    });
  };

  const columns = [
    { title: 'Titulo', field: 'title' },
    {
      title: 'Descricão',
      field: 'description',
      render: (rowData) => truncate(rowData.description, 24)
    },
    {
      title: 'Data inicial',
      field: 'initial_date',
      render: (rowData) => moment(rowData.initial_date).format('lll')
    },
    {
      title: 'Data final',
      field: 'end_date',
      render: (rowData) => moment(rowData.end_date).format('lll')
    },
    { title: 'Local', field: 'local' },

    {
      title: 'Status',
      field: 'status',
      render: (rowData) => status(rowData.end_date)
    },
    {
      title: 'Accçõs',
      field: 'id',
      render: (rowData) =>
        rowData && (
          <div>
            <Tooltip title="Editar">
              <IconButton
                color="success"
                onClick={() => {
                  setOpenPopup(true);
                  setEventId(rowData.id);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Detalhes">
              <Link to={`/dashboard/events/detail/${rowData.id}`}>
                <IconButton color="secondary">
                  <InfoRounded />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error" onClick={() => confirmDelete(rowData.id)}>
                <DeleteOutline />
              </IconButton>
            </Tooltip>
          </div>
        )
    }
  ];
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
        <Typography variant="h4" gutterBottom>
          Eventos
        </Typography>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/dashboard/events/new"
          startIcon={<Icon icon={plusFill} />}
        >
          Novo Evento
        </Button>
      </Stack>

      <Card>
        <MaterialTable
          data={graduationEvents}
          columns={columns}
          title="Seminarios"
          options={{
            // ...
            exportMenu: [
              {
                label: 'Export PDF',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Eventos de Palestras')
              },
              {
                label: 'Export CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Palestras')
              }
            ]
          }}
        />
      </Card>
      <Popup
        title="Edite os dados do evento aqui"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        id={eventId}
      />
    </>
  );
}
