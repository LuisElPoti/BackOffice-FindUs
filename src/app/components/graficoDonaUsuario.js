import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);
const PieChartWithTotal = ({ labels, data, backgroundColor, hoverBackgroundColor }) => {

  const chartData = {
    labels: labels || [], // Etiquetas de cada serie  
    datasets: [
      {
        data: data || [], // valores de cada serie
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor, // Colores de hover
    },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: true },
      legend: { // Configuración de la leyenda
        display: true,
        // position: 'right', // Posición de la leyenda (top, left, bottom, right)
        labels: {
          color: '#000000', // Color del texto de la leyenda (ajústalo si es necesario)
        },
    },
    },
    cutout: '70%', // Hace un agujero en el centro del gráfico para el número
  };

  return (
      <Doughnut data={chartData} options={options} />  
  );
};

export default PieChartWithTotal;
