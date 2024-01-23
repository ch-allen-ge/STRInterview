import './dataChartStyles.css';
import { useState } from 'react';
import { strGet } from '../../axios-config';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DataChart = ({sourceFrequency}) => {
    const mentionedObj = sourceFrequency.reduce((obj, item) => Object.assign(obj, { [item.source]: item.count }), {});

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Most Popular Sources',
          },
        },
    };

    const labels = ['Zeus', 'Poseidon', 'Hades', 'Hercules', 'Kratos', 'Boy'];
    const values = labels.map((god) => mentionedObj[god] ?? 0)

    const data = {
        labels,
        datasets: [
          {
            label: 'Times mentioned',
            data: values,
            backgroundColor: '#ccd5ae',
          }
        ],
    };

    return (
        <div className='chartContainer'>
            <Bar options={options} data={data} />
        </div>
    )
}

export default DataChart;