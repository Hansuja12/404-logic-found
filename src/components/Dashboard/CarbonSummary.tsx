
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, getEmissionLevel, getTotalEmissions } from '@/utils/calculators';
import { Leaf, AlertTriangle, ThumbsUp } from 'lucide-react';

interface CarbonSummaryProps {
  activities: Activity[];
}

const CarbonSummary: React.FC<CarbonSummaryProps> = ({ activities }) => {
  const totalEmissions = getTotalEmissions(activities);
  const emissionLevel = getEmissionLevel(totalEmissions);
  
  const getEmissionIcon = () => {
    switch (emissionLevel) {
      case 'low':
        return <ThumbsUp className="h-6 w-6 text-green-500" />;
      case 'medium':
        return <Leaf className="h-6 w-6 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Leaf className="h-6 w-6 text-eco-accent" />;
    }
  };
  
  const getSummaryMessage = () => {
    switch (emissionLevel) {
      case 'low':
        return "Great job! Your carbon footprint is lower than average.";
      case 'medium':
        return "You're on the right track. Keep working to reduce your emissions.";
      case 'high':
        return "Your carbon footprint is high. Check out our tips to reduce it.";
      default:
        return "Track your activities to see your carbon footprint.";
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Carbon Footprint Summary</CardTitle>
          <Badge 
            variant={emissionLevel === 'low' ? 'default' : emissionLevel === 'medium' ? 'outline' : 'destructive'}
            className="capitalize"
          >
            {emissionLevel} Impact
          </Badge>
        </div>
        <CardDescription>{getSummaryMessage()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{totalEmissions.toFixed(2)} kg CO₂e</p>
            <p className="text-sm text-muted-foreground">Total emissions this week</p>
          </div>
          <div className="bg-muted p-3 rounded-full">
            {getEmissionIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonSummary;
