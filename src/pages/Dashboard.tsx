
import { useEffect, useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import CarbonSummary from '@/components/Dashboard/CarbonSummary';
import EmissionsChart from '@/components/Dashboard/EmissionsChart';
import RecentActivities from '@/components/Dashboard/RecentActivities';
import EcoTips from '@/components/Tips/EcoTips';
import EcoAvatar from '@/components/Avatar/EcoAvatar';
import { Activity, generateRandomActivities, getEmissionsByCategory } from '@/utils/calculators';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Plus, Trash2, PenLine, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const navigate = useNavigate();
  
  // Load data from localStorage
  useEffect(() => {
    setIsLoading(true);
    
    const savedActivities = localStorage.getItem('eco-activities');
    
    if (savedActivities) {
      try {
        const parsed = JSON.parse(savedActivities);
        // Convert string dates back to Date objects
        const activitiesWithDates = parsed.map((act: any) => ({
          ...act,
          date: new Date(act.date)
        }));
        setActivities(activitiesWithDates);
      } catch (error) {
        console.error('Error parsing saved activities:', error);
        setActivities([]);
      }
    } else {
      // No data found, show a message to add activities
      setActivities([]);
    }
    
    setIsLoading(false);
  }, []);
  
  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eco-activities', JSON.stringify(activities));
  }, [activities]);
  
  // Filter activities by category
  const getFilteredActivities = () => {
    if (activeTab === 'all') {
      return activities;
    }
    return activities.filter(activity => activity.category === activeTab);
  };

  // Get counts by category
  const getCategoryCounts = () => {
    const counts = {
      transport: 0,
      food: 0,
      energy: 0,
      shopping: 0,
    };
    
    activities.forEach(activity => {
      if (activity.category in counts) {
        counts[activity.category as keyof typeof counts]++;
      }
    });
    
    return counts;
  };
  
  // Get emissions by category
  const categoryEmissions = getEmissionsByCategory(activities);
  const categoryCounts = getCategoryCounts();
  
  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter(a => a.id !== id);
    setActivities(updatedActivities);
    localStorage.setItem('eco-activities', JSON.stringify(updatedActivities));
    toast.success('Activity deleted successfully!');
  };
  
  const handleClearAllActivities = () => {
    setActivities([]);
    localStorage.setItem('eco-activities', JSON.stringify([]));
    toast.success('All activities cleared successfully!');
  };
  
  const handleGenerateSampleData = () => {
    const newActivities = generateRandomActivities(7);
    const updatedActivities = [...newActivities, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem('eco-activities', JSON.stringify(updatedActivities));
    toast.success('Sample data generated!');
  };
  
  const goToInputPage = () => {
    navigate('/input');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-40 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-4 w-60 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'food':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'energy':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'shopping':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-eco-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-eco-primary">
            Your Carbon Footprint Dashboard
          </h1>
          <div className="flex gap-2">
            <Button 
              onClick={goToInputPage}
              className="bg-eco-primary hover:bg-eco-primary/90"
            >
              <PenLine className="h-4 w-4 mr-1" /> Add Activity
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleGenerateSampleData} 
              className="text-xs md:text-sm"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Generate Sample Data
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="text-xs md:text-sm">
                  <Trash2 className="h-4 w-4 mr-1" /> Clear Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your activities.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAllActivities}>Delete All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        {activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Activities Yet</h2>
            <p className="text-gray-600 mb-6">
              Start tracking your carbon footprint by adding your daily activities.
            </p>
            <Button 
              onClick={goToInputPage}
              className="bg-eco-primary hover:bg-eco-primary/90 mx-auto"
            >
              <PenLine className="h-4 w-4 mr-2" /> Add Your First Activity
            </Button>
          </div>
        ) : (
          <>
            {/* Category summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(categoryEmissions).map(([category, emissions]) => (
                <Card 
                  key={category}
                  className={`border ${getCategoryColor(category)}`}
                  onClick={() => setActiveTab(category)}
                  role="button"
                  tabIndex={0}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg capitalize flex items-center justify-between">
                      {category}
                      <Badge variant="outline">{categoryCounts[category as keyof typeof categoryCounts]} items</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{emissions.toFixed(2)} kg CO₂e</div>
                    <p className="text-sm text-muted-foreground">Total emissions</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Filter tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <div className="flex items-center mb-2">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by category:</span>
              </div>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="energy">Energy</TabsTrigger>
                <TabsTrigger value="shopping">Shopping</TabsTrigger>
              </TabsList>
            </Tabs>
          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <CarbonSummary activities={getFilteredActivities()} />
                <EmissionsChart activities={getFilteredActivities()} />
                <RecentActivities 
                  activities={getFilteredActivities()} 
                  onDeleteActivity={handleDeleteActivity} 
                />
              </div>
              
              <div>
                <div className="mb-6">
                  <EcoAvatar activities={activities} />
                </div>
                <div className="mb-6">
                  <EcoTips activities={activities} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
