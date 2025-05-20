import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { sliderColors } from "./slider-colors";

const FONT_FAMILY = 'Ubuntu Mono, monospace';
const LEGEND_POSITION = 'top';
const Y_AXIS_LABEL = 'Amount (L)';
const X_AXIS_LABEL = 'Date';

function HydrationBarChart({ hydrationData }:{ hydrationData:{ date: string; water: number; coffee: number; tea: number }[] }) {
    
    // setup the x axis values
    const labels = hydrationData.map(item => item.date);

    // set up the data headers
    const data = {
        labels,
        datasets: [
            {
                label: 'Water',
                data: hydrationData.map(item => item.water),
                backgroundColor: sliderColors['water']['fill'],
            },
            {
                label: 'Coffee',
                data: hydrationData.map(item => item.coffee),
                backgroundColor: sliderColors['coffee']['fill'],
            },
            {
                label: 'Tea',
                data: hydrationData.map(item => item.tea),
                backgroundColor: sliderColors['tea']['fill'],
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: LEGEND_POSITION,
                labels: {
                        font: {
                        family: FONT_FAMILY,
                    },
                },
            },
            tooltip: {
                bodyFont: {
                    family: FONT_FAMILY,
                },
                titleFont: {
                    family: FONT_FAMILY,
                },
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: X_AXIS_LABEL,
                    font: {
                        family: FONT_FAMILY,
                    },
                },
                ticks: {
                    font: {
                        family: FONT_FAMILY,
                    },
                },
            },
            y: {
            title: {
                display: true,
                text: Y_AXIS_LABEL,
                font: {
                    family: FONT_FAMILY,
                },
            },
            ticks: {
                font: {
                    family: FONT_FAMILY,
                },
            },
            },
        },
    };


    return <Bar data={data} options={options} />;
}

export default HydrationBarChart