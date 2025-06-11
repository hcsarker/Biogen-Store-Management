
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';

const AccountSummary = () => {
  const financialData = {
    totalRevenue: 1250000,
    totalExpenses: 780000,
    netProfit: 470000,
    cashInHand: 125000,
    accountsReceivable: 85000,
    accountsPayable: 65000
  };

  const expenseBreakdown = [
    { name: 'Inventory Purchase', value: 450000, color: '#3b82f6' },
    { name: 'Salaries', value: 180000, color: '#10b981' },
    { name: 'Rent & Utilities', value: 85000, color: '#f59e0b' },
    { name: 'Marketing', value: 35000, color: '#ef4444' },
    { name: 'Other', value: 30000, color: '#8b5cf6' }
  ];

  const monthlyProfit = [
    { month: 'Jan', revenue: 195000, expenses: 125000, profit: 70000 },
    { month: 'Feb', revenue: 220000, expenses: 140000, profit: 80000 },
    { month: 'Mar', revenue: 185000, expenses: 120000, profit: 65000 },
    { month: 'Apr', revenue: 235000, expenses: 155000, profit: 80000 },
    { month: 'May', revenue: 210000, expenses: 135000, profit: 75000 },
    { month: 'Jun', revenue: 205000, expenses: 105000, profit: 100000 }
  ];

  const recentTransactions = [
    { date: '2024-01-05', description: 'Medicine Sales', type: 'Income', amount: 15400 },
    { date: '2024-01-05', description: 'Inventory Purchase', type: 'Expense', amount: -8500 },
    { date: '2024-01-04', description: 'Salary Payment', type: 'Expense', amount: -25000 },
    { date: '2024-01-04', description: 'Medicine Sales', type: 'Income', amount: 18200 },
    { date: '2024-01-03', description: 'Rent Payment', type: 'Expense', amount: -12000 }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Account Summary</h1>
            <p className="text-muted-foreground">Financial overview and accounting details</p>
          </div>

          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-green-600">₹{financialData.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-red-600">₹{financialData.totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Expenses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold text-blue-600">₹{financialData.netProfit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Net Profit</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold">₹{financialData.cashInHand.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Cash in Hand</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold">₹{financialData.accountsReceivable.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Accounts Receivable</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-lg font-bold">₹{financialData.accountsPayable.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Accounts Payable</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Profit Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyProfit}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Bar dataKey="profit" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          transaction.type === 'Income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{Math.abs(transaction.amount).toLocaleString()}
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

export default AccountSummary;
