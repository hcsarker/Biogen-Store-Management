
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/hooks/use-toast';

const AddCustomer = () => {
  const { toast } = useToast();
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerData.name || !customerData.phone) {
      toast({
        title: "Validation Error",
        description: "Name and phone number are required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Customer Added",
      description: `Customer ${customerData.name} has been successfully registered`
    });

    // Reset form
    setCustomerData({
      name: '',
      phone: '',
      email: '',
      address: '',
      dateOfBirth: '',
      emergencyContact: '',
      medicalHistory: ''
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Add Customer</h1>
            <p className="text-muted-foreground">Register new customer information</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Customer Registration Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={customerData.dateOfBirth}
                      onChange={(e) => setCustomerData({...customerData, dateOfBirth: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={customerData.emergencyContact}
                    onChange={(e) => setCustomerData({...customerData, emergencyContact: e.target.value})}
                    placeholder="Emergency contact number"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalHistory">Medical History/Notes</Label>
                  <Textarea
                    id="medicalHistory"
                    value={customerData.medicalHistory}
                    onChange={(e) => setCustomerData({...customerData, medicalHistory: e.target.value})}
                    placeholder="Any relevant medical history or notes"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Add Customer</Button>
                  <Button type="button" variant="outline">Reset Form</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddCustomer;
