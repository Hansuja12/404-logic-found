
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, calculateEmissions } from '@/utils/calculators';
import { emissionFactors, activityTypes, EmissionCategory } from '@/utils/data';
import ActivityInput from './ActivityInput';
import { Car, Utensils, Zap, ShoppingBag, PlusCircle, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';

interface CarbonCalculatorProps {
  onAddActivity: (activity: Activity) => void;
}

const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ onAddActivity }) => {
  const [activeTab, setActiveTab] = useState<string>('transport');
  const [currentActivity, setCurrentActivity] = useState<Partial<Activity>>({
    category: 'transport',
    subCategory: 'car',
    value: 0,
    unit: 'km',
    emissions: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<Activity[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Reset the form when changing tabs
    const category = tab as EmissionCategory;
    const defaultSubCategory = Object.keys(getCategoryOptions(category))[0];
    const unit = getUnitForCategory(category);
    
    setCurrentActivity({
      category,
      subCategory: defaultSubCategory,
      value: 0,
      unit,
      emissions: 0,
    });
  };

  const handleActivityChange = (changes: Partial<Activity>) => {
    setCurrentActivity(prev => {
      const updated = { ...prev, ...changes };
      
      // Recalculate emissions if necessary values are present
      if (updated.category && updated.subCategory && updated.value !== undefined) {
        updated.emissions = calculateEmissions(
          updated.category as EmissionCategory,
          updated.subCategory,
          updated.value,
          updated.unit || getUnitForCategory(updated.category as EmissionCategory)
        );
      }
      
      return updated;
    });
  };

  const getCategoryOptions = (category: EmissionCategory) => {
    switch (category) {
      case 'transport':
        return emissionFactors.transport;
      case 'food':
        return {
          beef: emissionFactors.food.meat.beef,
          chicken: emissionFactors.food.meat.chicken,
          pork: emissionFactors.food.meat.pork,
          milk: emissionFactors.food.dairy.milk,
          cheese: emissionFactors.food.dairy.cheese,
          vegetables: emissionFactors.food.plantBased.vegetables,
          fruits: emissionFactors.food.plantBased.fruits,
        };
      case 'energy':
        return emissionFactors.energy;
      case 'shopping':
        return emissionFactors.shopping;
      default:
        return {};
    }
  };

  const getUnitForCategory = (category: EmissionCategory): string => {
    switch (category) {
      case 'transport':
        return 'km';
      case 'food':
        return 'kg';
      case 'energy':
        return 'kWh';
      case 'shopping':
        return 'items';
      default:
        return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return <Car className="h-4 w-4" />;
      case 'food':
        return <Utensils className="h-4 w-4" />;
      case 'energy':
        return <Zap className="h-4 w-4" />;
      case 'shopping':
        return <ShoppingBag className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const resetForm = () => {
    const category = activeTab as EmissionCategory;
    const defaultSubCategory = Object.keys(getCategoryOptions(category))[0];
    const unit = getUnitForCategory(category);
    
    setCurrentActivity({
      category,
      subCategory: defaultSubCategory,
      value: 0,
      unit,
      emissions: 0,
    });
    
    toast.info('Form reset');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentActivity.value || currentActivity.value <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const newActivity: Activity = {
      id: `${Date.now()}`,
      date: new Date(),
      category: currentActivity.category as EmissionCategory,
      subCategory: currentActivity.subCategory || '',
      value: currentActivity.value,
      unit: currentActivity.unit || '',
      emissions: currentActivity.emissions || 0
    };
    
    onAddActivity(newActivity);
    
    // Add to recent submissions
    setRecentSubmissions(prev => {
      const updated = [newActivity, ...prev].slice(0, 3);
      return updated;
    });
    
    // Reset form
    resetForm();
  };
  
  const resubmitActivity = (activity: Activity) => {
    onAddActivity({
      ...activity,
      id: `${Date.now()}`,
      date: new Date()
    });
    toast.success('Activity re-added successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Carbon Activity</CardTitle>
        <CardDescription>Record your activities to track your carbon footprint</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="activity-form">
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              {activityTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
                  {getCategoryIcon(type.id)}
                  <span className="hidden sm:inline">{type.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {activityTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="mt-4">
                <ActivityInput 
                  category={type.id}
                  options={getCategoryOptions(type.id as EmissionCategory)}
                  onChange={handleActivityChange}
                  value={currentActivity.value || 0}
                />
              </TabsContent>
            ))}
          </Tabs>
          
          {recentSubmissions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Recent Submissions:</h4>
              <div className="flex flex-wrap gap-2">
                {recentSubmissions.map((activity) => (
                  <Button
                    key={activity.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    onClick={() => resubmitActivity(activity)}
                  >
                    <Save className="h-3 w-3" />
                    <span className="capitalize">{activity.subCategory}</span>
                    <span>({activity.value} {activity.unit})</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-sm font-medium">Estimated Emissions:</p>
          <p className="text-lg font-bold">{(currentActivity.emissions || 0).toFixed(2)} kg CO₂e</p>
        </div>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={resetForm}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button 
            type="submit" 
            form="activity-form" 
            className="bg-eco-primary hover:bg-eco-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Activity
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarbonCalculator;
