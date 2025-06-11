
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

const PurchaseReport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const purchaseData = [
    { supplier: 'MedSupply Co.', amount: 45000, items: 25, date: '2024-01-01' },
    { supplier: 'PharmaCorp', amount: 32000, items: 18, date: '2024-01-02' },
    { supplier: 'HealthDistributors', amount: 28000, items: 15, date: '2024-01-03' },
    { supplier: 'MediWholesale', amount: 51000, items: 30, date: '2024-01-04' },
    { supplier: 'DrugSuppliers Ltd', amount: 39000, items: 22, date: '2024-01-05' }
  ];

  const monthlyPurchases = [
    { month: 'Jan', amount: 195000 },
    { month: 'Feb', amount: 220000 },
    { month: 'Mar', amount: 185000 },
    { month: 'Apr', amount: 235000 },
    { month: 'May', amount: 210000 },
    { month: 'Jun', amount: 245000 }
  ];

  const totalPurchases = purchaseData.reduce((sum, purchase) => sum + purchase.amount, 0);
  const totalItems = purchaseData.reduce((sum, purchase) => sum + purchase.items, 0);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Purchase Report</h1>
            <p className="text-muted-foreground">Track and analyze purchase activities</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">₹{totalPurchases.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{totalItems}</div>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{purchaseData.length}</div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Purchase Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Purchase Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyPurchases}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="amount" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Purchases */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseData.map((purchase, index) => (
                      <TableRow key={index}>
                        <TableCell>{purchase.supplier}</TableCell>
                        <TableCell>₹{purchase.amount.toLocaleString()}</TableCell>
                        <TableCell>{purchase.items}</TableCell>
                        <TableCell>{purchase.date}</TableCell>
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

export default PurchaseReport;
