
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StatisticsPanel = () => {
  const stats = [
    { label: 'Number Of Sales', value: '3', badge: 'Recent: 3 hrs' },
    { label: 'Total Sales', value: '₹ 413,250.00', badge: null },
    { label: 'Number Of Expenses', value: '5', badge: null },
    { label: 'Total Expenses', value: '₹5 3846.40', badge: null },
    { label: 'Medicine Expire Alert', value: '5', badge: null },
    { label: 'In Stock Inventory Quantity', value: '8,877', badge: null },
    { label: 'Medicine out Of Stock', value: '5', badge: null }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Key metrics (7 Day Result)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-sm">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{stat.value}</span>
                {stat.badge && (
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">
                    {stat.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsPanel;
