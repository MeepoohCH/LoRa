// components/LineChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // ข้อมูลที่ใช้ในการแสดงกราฟเส้น
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // ค่าเดือน
    datasets: [
      {
        label: 'My Dataset', // ชื่อของกราฟ
        data: [65, 59, 80, 81, 56, 55], // ข้อมูลที่แสดงบนกราฟ
        fill: false, // ไม่ให้กราฟเต็ม
        borderColor: 'rgb(75, 192, 192)', // สีเส้น
        tension: 0.1, // ค่าความโค้งของเส้น
      },
    ],
  };

  return (
    <div>
      <h2>My Line Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
