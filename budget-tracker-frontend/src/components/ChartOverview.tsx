// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { PieChart, Pie, Tooltip } from 'recharts';

// const ChartOverview: React.FC = () => {
//     const email = localStorage.getItem('userEmail');

//     const { data: chartData, isLoading } = useQuery(['chartData'], async () => {
//         const response = await axios.get('/api/expenses/chart-data', { params: { userId: email } });
//         return response.data.map((item: any) => ({
//             name: item.categoryName,
//             value: item.expenseCount,
//         }));
//     });

//     if (isLoading) return <div>Loading chart...</div>;

//     return (
//         <div>
//             <h3>Expense Chart</h3>
//             <PieChart width={400} height={400}>
//                 <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" />
//                 <Tooltip />
//             </PieChart>
//         </div>
//     );
// };

// export default ChartOverview;
