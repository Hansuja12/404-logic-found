
import { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import CarbonCalculator from '@/components/Calculator/CarbonCalculator';
import { Activity } from '@/utils/calculators';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

const UserInput = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>(() => {
    // Load activities from localStorage
    const savedActivities = localStorage.getItem('eco-activities');
    if (savedActivities) {
      try {
        const parsed = JSON.parse(savedActivities);
        // Convert string dates back to Date objects
        return parsed.map((act: any) => ({
          ...act,
          date: new Date(act.date)
        }));
      } catch (error) {
        console.error('Error parsing saved activities:', error);
        return [];
      }
    }
    return [];
  });
  
  const handleAddActivity = (activity: Activity) => {
    const updatedActivities = [activity, ...activities];
    setActivities(updatedActivities);
    
    // Save to localStorage
    localStorage.setItem('eco-activities', JSON.stringify(updatedActivities));
    
    toast.success('Activity added successfully!');
  };
  
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-eco-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-eco-primary">
            Record Your Carbon Footprint
          </h1>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            onClick={goToDashboard}
          >
            <Leaf className="mr-2 h-4 w-4" />
            View Dashboard
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Track Your Activities</h2>
            <p className="text-gray-600 mb-6">
              Record your daily activities to calculate your carbon footprint. 
              The more activities you record, the more accurate your carbon 
              footprint estimation will be.
            </p>
            <CarbonCalculator onAddActivity={handleAddActivity} />
          </div>
          
          {activities.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-green-800">
                You've recorded {activities.length} {activities.length === 1 ? 'activity' : 'activities'}!
              </p>
              <Button 
                variant="link" 
                className="text-green-700" 
                onClick={goToDashboard}
              >
                View your impact on the dashboard →
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserInput;
