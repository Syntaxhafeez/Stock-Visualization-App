import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StockData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  data: StockData[];
  index: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, index }) => {
  const chartData = {
    labels: data.map((item) => item.index_date),
    datasets: [
      {
        label: 'Closing Value',
        data: data.map((item) => item.closing_index_value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Opening Value',
        data: data.map((item) => item.open_index_value),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${index} Index Value History`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Points Change</p>
            <p className={`text-xl font-bold ${data[0].points_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data[0].points_change > 0 ? '+' : ''}{data[0].points_change}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Change %</p>
            <p className={`text-xl font-bold ${data[0].change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data[0].change_percent > 0 ? '+' : ''}{data[0].change_percent}%
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">P/E Ratio</p>
            <p className="text-xl font-bold text-purple-600">{data[0].pe_ratio.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">Dividend Yield</p>
            <p className="text-xl font-bold text-orange-600">{data[0].div_yield}%</p>
          </div>
        </div>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
}

export default StockChart;