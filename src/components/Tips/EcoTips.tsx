
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { tips, EmissionCategory } from '@/utils/data';
import { Activity, getEmissionsByCategory } from '@/utils/calculators';
import { useState, useEffect } from 'react';

interface EcoTipsProps {
  activities: Activity[];
}

const EcoTips: React.FC<EcoTipsProps> = ({ activities }) => {
  const [highestCategory, setHighestCategory] = useState<EmissionCategory | null>(null);
  const [randomTip, setRandomTip] = useState<string>('');
  
  useEffect(() => {
    if (activities.length > 0) {
      const categoryEmissions = getEmissionsByCategory(activities);
      let highest: EmissionCategory = 'transport';
      let highestValue = 0;
      
      (Object.entries(categoryEmissions) as [EmissionCategory, number][]).forEach(([category, value]) => {
        if (value > highestValue) {
          highest = category;
          highestValue = value;
        }
      });
      
      setHighestCategory(highest);
      
      // Get a random tip from the highest emission category
      const categoryTips = tips[highest];
      const randomIndex = Math.floor(Math.random() * categoryTips.length);
      setRandomTip(categoryTips[randomIndex]);
    } else {
      // Default tip if no activities
      setRandomTip("Start tracking your activities to get personalized tips!");
    }
  }, [activities]);
  
  return (
    <Card className="border-eco-accent/30">
      <CardHeader className="pb-2 flex flex-row items-start space-x-4">
        <div className="bg-eco-accent/20 p-2 rounded-full mt-0.5">
          <Lightbulb className="h-5 w-5 text-eco-accent" />
        </div>
        <div>
          <CardTitle>Eco Tip</CardTitle>
          <CardDescription>
            {highestCategory ? `Based on your ${highestCategory} emissions` : 'Get started with this tip'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{randomTip}</p>
      </CardContent>
    </Card>
  );
};

export default EcoTips;
