
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

const StockReport = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stockData = [
    { id: 1, name: 'Paracetamol 500mg', currentStock: 245, minStock: 50, maxStock: 500, status: 'In Stock', lastUpdated: '2024-01-05' },
    { id: 2, name: 'Amoxicillin 250mg', currentStock: 12, minStock: 20, maxStock: 200, status: 'Low Stock', lastUpdated: '2024-01-04' },
    { id: 3, name: 'Aspirin 75mg', currentStock: 0, minStock: 30, maxStock: 300, status: 'Out of Stock', lastUpdated: '2024-01-03' },
    { id: 4, name: 'Ibuprofen 400mg', currentStock: 189, minStock: 40, maxStock: 400, status: 'In Stock', lastUpdated: '2024-01-05' },
    { id: 5, name: 'Cough Syrup', currentStock: 67, minStock: 25, maxStock: 150, status: 'In Stock', lastUpdated: '2024-01-04' },
    { id: 6, name: 'Vitamin C', currentStock: 15, minStock: 20, maxStock: 200, status: 'Low Stock', lastUpdated: '2024-01-02' },
    { id: 7, name: 'Insulin Pen', currentStock: 8, minStock: 15, maxStock: 100, status: 'Low Stock', lastUpdated: '2024-01-01' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case 'Low Stock':
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case 'Out of Stock':
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredStock = stockData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inStockCount = stockData.filter(item => item.status === 'In Stock').length;
  const lowStockCount = stockData.filter(item => item.status === 'Low Stock').length;
  const outOfStockCount = stockData.filter(item => item.status === 'Out of Stock').length;
  const totalValue = stockData.reduce((sum, item) => sum + (item.currentStock * 10), 0); // Assuming avg price 10

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Stock Report</h1>
            <p className="text-muted-foreground">Monitor inventory levels and stock status</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">{inStockCount}</div>
                <p className="text-sm text-muted-foreground">Items In Stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Stock Value</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Medicine</Label>
                  <Input
                    id="search"
                    placeholder="Enter medicine name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button>Export Report</Button>
                  <Button variant="outline">Print Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Table */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min Stock</TableHead>
                    <TableHead>Max Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.currentStock}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>{item.maxStock}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Update</Button>
                          <Button size="sm" variant="outline">Reorder</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StockReport;
