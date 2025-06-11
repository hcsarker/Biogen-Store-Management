
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

const SalesReport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const salesData = [
    { date: '2024-01-01', sales: 5400, transactions: 24 },
    { date: '2024-01-02', sales: 7200, transactions: 32 },
    { date: '2024-01-03', sales: 6800, transactions: 28 },
    { date: '2024-01-04', sales: 9100, transactions: 41 },
    { date: '2024-01-05', sales: 8300, transactions: 37 },
    { date: '2024-01-06', sales: 7600, transactions: 35 },
    { date: '2024-01-07', sales: 8900, transactions: 39 }
  ];

  const topMedicines = [
    { name: 'Paracetamol', quantity: 150, revenue: 4500 },
    { name: 'Amoxicillin', quantity: 89, revenue: 8900 },
    { name: 'Aspirin', quantity: 120, revenue: 3600 },
    { name: 'Ibuprofen', quantity: 95, revenue: 5700 },
    { name: 'Cough Syrup', quantity: 78, revenue: 3900 }
  ];

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0);
  const averageSale = totalSales / totalTransactions;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Sales Report</h1>
            <p className="text-muted-foreground">View detailed sales analytics and reports</p>
          </div>

          {/* Date Filter */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter by Date Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  />
                </div>
                <Button>Generate Report</Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{totalTransactions}</div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">₹{averageSale.toFixed(0)}</div>
                <p className="text-sm text-muted-foreground">Average Sale</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{Math.round(totalSales / 7)}</div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Selling Medicines */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topMedicines.map((medicine, index) => (
                      <TableRow key={index}>
                        <TableCell>{medicine.name}</TableCell>
                        <TableCell>{medicine.quantity}</TableCell>
                        <TableCell>₹{medicine.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesReport;
