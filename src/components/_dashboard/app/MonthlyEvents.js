import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
// material
import { Card, CardHeader, Box } from '@mui/material';

// events data
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { eventActions } from '../../../actions';

// Cart
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

MonthlyEvents.propTypes = {
  events: PropTypes.array.isRequired
};
const chartData = [
  {
    name: '',
    type: 'line',
    data: []
  },
  {
    name: '',
    type: 'line',
    data: []
  },
  {
    name: 'Eventos',
    type: 'line',
    data: []
  }
];
export default function MonthlyEvents({ events }) {
  useEffect(() => {
    // eslint-disable-next-line
    for (let index = 0; index < 12; index++) {
      const filered = events.filter((meses) => moment(meses.initial_date).month() === index).length;
      if (filered !== 0) {
        chartData[2].data.push(filered);
      }
    }

    // eslint-disable-next-line
  }, [events, chartData]);

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      // '01/01/2022',
      '02/01/2022',
      '03/01/2022',
      '04/01/2022',
      '05/01/2022',
      '06/01/2022',
      '07/01/2022',
      '08/01/2022',
      '09/01/2022',
      '10/01/2022',
      '11/01/2022',
      '12/01/2022'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} eventos`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader
        title="Nivel de crescimento mensal dos eventos"
        subheader="(+3%) do que mes anterior"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {chartData[2]?.data.length !== 0 ? (
          <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
        ) : (
          ''
        )}
      </Box>
    </Card>
  );
}
