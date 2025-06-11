
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
}

const StatsCard = ({ title, description, icon, onClick }: StatsCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
