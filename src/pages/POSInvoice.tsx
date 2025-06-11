
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/hooks/use-toast';

interface InvoiceItem {
  id: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const POSInvoice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [currentItem, setCurrentItem] = useState({
    medicineName: '',
    quantity: 1,
    unitPrice: 0
  });

  const addItem = () => {
    if (!currentItem.medicineName || currentItem.unitPrice <= 0) {
      toast({
        title: "Invalid Item",
        description: "Please enter valid medicine name and price",
        variant: "destructive"
      });
      return;
    }

    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      medicineName: currentItem.medicineName,
      quantity: currentItem.quantity,
      unitPrice: currentItem.unitPrice,
      total: currentItem.quantity * currentItem.unitPrice
    };

    setItems([...items, newItem]);
    setCurrentItem({ medicineName: '', quantity: 1, unitPrice: 0 });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const generateInvoice = () => {
    if (!customerName || items.length === 0) {
      toast({
        title: "Incomplete Invoice",
        description: "Please add customer name and at least one item",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invoice Generated",
      description: `Invoice created for ${customerName} - Total: ₹${totalAmount}`
    });

    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setItems([]);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">POS Invoice</h1>
            <p className="text-muted-foreground">Generate new point of sale invoice</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Items */}
            <Card>
              <CardHeader>
                <CardTitle>Add Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="medicineName">Medicine Name</Label>
                  <Input
                    id="medicineName"
                    value={currentItem.medicineName}
                    onChange={(e) => setCurrentItem({...currentItem, medicineName: e.target.value})}
                    placeholder="Enter medicine name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={currentItem.quantity}
                      onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value) || 1})}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitPrice">Unit Price (₹)</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      value={currentItem.unitPrice}
                      onChange={(e) => setCurrentItem({...currentItem, unitPrice: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <Button onClick={addItem} className="w-full">Add Item</Button>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Items */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.medicineName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₹{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>₹{item.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {items.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No items added yet
                </div>
              )}

              {items.length > 0 && (
                <div className="mt-4 text-right">
                  <div className="text-lg font-bold">
                    Total Amount: ₹{totalAmount.toFixed(2)}
                  </div>
                  <Button onClick={generateInvoice} className="mt-4">
                    Generate Invoice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default POSInvoice;
