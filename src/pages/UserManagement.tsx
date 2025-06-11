
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Pharmacist',
    phone: ''
  });

  const users = [
    { id: 1, name: 'John Doe', email: 'john@pharmacy.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-05' },
    { id: 2, name: 'Jane Smith', email: 'jane@pharmacy.com', role: 'Pharmacist', status: 'Active', lastLogin: '2024-01-04' },
    { id: 3, name: 'Mike Johnson', email: 'mike@pharmacy.com', role: 'Cashier', status: 'Active', lastLogin: '2024-01-03' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@pharmacy.com', role: 'Pharmacist', status: 'Inactive', lastLogin: '2023-12-28' },
    { id: 5, name: 'David Brown', email: 'david@pharmacy.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-05' }
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "User Added",
      description: `User ${newUser.name} has been successfully added`
    });

    setNewUser({ name: '', email: '', role: 'Pharmacist', phone: '' });
    setShowAddForm(false);
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      'Admin': 'bg-red-100 text-red-800',
      'Manager': 'bg-blue-100 text-blue-800',
      'Pharmacist': 'bg-green-100 text-green-800',
      'Cashier': 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage system users and permissions</p>
          </div>

          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search users..."
                className="w-64"
              />
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : 'Add New User'}
            </Button>
          </div>

          {/* Add User Form */}
          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit">Add User</Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Reset Password</Button>
                          <Button size="sm" variant="destructive">Deactivate</Button>
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

export default UserManagement;
