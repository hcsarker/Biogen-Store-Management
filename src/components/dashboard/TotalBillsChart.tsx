
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const TotalBillsChart = () => {
  const data = [
    { name: 'Doctor', value: 500 },
    { name: 'food', value: 600 },
    { name: 'Medicine', value: 650 },
    { name: 'parking', value: 1400 },
    { name: 'salary', value: 1000 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Bills</CardTitle>
        <CardDescription>Monthly expense breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TotalBillsChart;
