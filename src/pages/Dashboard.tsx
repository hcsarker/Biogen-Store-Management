
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import TotalBillsChart from '@/components/dashboard/TotalBillsChart';
import StatisticsPanel from '@/components/dashboard/StatisticsPanel';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const dashboardStats = [
    {
      title: "Create POS Invoice",
      description: "Generate new invoice",
      icon: "📄",
      onClick: () => navigate('/pos-invoice')
    },
    {
      title: "Create New Invoice", 
      description: "Create invoice",
      icon: "📋",
      onClick: () => navigate('/invoice')
    },
    {
      title: "Add Medicine",
      description: "Add new medicine",
      icon: "🛒",
      onClick: () => navigate('/add-medicine')
    },
    {
      title: "Add Customer",
      description: "Register customer",
      icon: "👤",
      onClick: () => navigate('/add-customer')
    },
    {
      title: "Sales Report",
      description: "View sales data",
      icon: "🏷️",
      onClick: () => navigate('/sales-report')
    },
    {
      title: "Purchase Report",
      description: "View purchases",
      icon: "📅",
      onClick: () => navigate('/purchase-report')
    },
    {
      title: "Stock Report",
      description: "Inventory status",
      icon: "📊",
      onClick: () => navigate('/stock-report')
    },
    {
      title: "Account Summary",
      description: "Financial overview",
      icon: "🔍",
      onClick: () => navigate('/account-summary')
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts and Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TotalBillsChart />
            <StatisticsPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
