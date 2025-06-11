
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/hooks/use-toast';

const Invoice = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    items: '',
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0
  });

  const calculateTotal = () => {
    const total = invoiceData.subtotal + invoiceData.tax - invoiceData.discount;
    setInvoiceData({...invoiceData, total});
  };

  const createInvoice = () => {
    if (!invoiceData.customerName || !invoiceData.items) {
      toast({
        title: "Incomplete Invoice",
        description: "Please fill in customer name and items",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invoice Created",
      description: `Invoice ${invoiceData.invoiceNumber} created successfully`
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Create Invoice</h1>
            <p className="text-muted-foreground">Generate detailed invoice</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={invoiceData.customerName}
                      onChange={(e) => setInvoiceData({...invoiceData, customerName: e.target.value})}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      value={invoiceData.customerPhone}
                      onChange={(e) => setInvoiceData({...invoiceData, customerPhone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerAddress">Address</Label>
                  <Textarea
                    id="customerAddress"
                    value={invoiceData.customerAddress}
                    onChange={(e) => setInvoiceData({...invoiceData, customerAddress: e.target.value})}
                    placeholder="Enter customer address"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="items">Items/Description</Label>
                <Textarea
                  id="items"
                  value={invoiceData.items}
                  onChange={(e) => setInvoiceData({...invoiceData, items: e.target.value})}
                  placeholder="Enter items and descriptions"
                  rows={5}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Amount Calculation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="subtotal">Subtotal (₹)</Label>
                    <Input
                      id="subtotal"
                      type="number"
                      value={invoiceData.subtotal}
                      onChange={(e) => setInvoiceData({...invoiceData, subtotal: parseFloat(e.target.value) || 0})}
                      onBlur={calculateTotal}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax">Tax (₹)</Label>
                    <Input
                      id="tax"
                      type="number"
                      value={invoiceData.tax}
                      onChange={(e) => setInvoiceData({...invoiceData, tax: parseFloat(e.target.value) || 0})}
                      onBlur={calculateTotal}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount (₹)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={invoiceData.discount}
                      onChange={(e) => setInvoiceData({...invoiceData, discount: parseFloat(e.target.value) || 0})}
                      onBlur={calculateTotal}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    Total: ₹{invoiceData.total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={createInvoice}>Create Invoice</Button>
                <Button variant="outline">Print Invoice</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Invoice;
