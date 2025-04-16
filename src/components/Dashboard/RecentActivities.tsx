
import { Activity } from '@/utils/calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useState } from 'react';

interface RecentActivitiesProps {
  activities: Activity[];
  onDeleteActivity: (id: string) => void;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, onDeleteActivity }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 5;
  
  // Get current activities
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageCount = Math.max(1, Math.ceil(activities.length / activitiesPerPage));
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-blue-100 text-blue-600';
      case 'food':
        return 'bg-green-100 text-green-600';
      case 'energy':
        return 'bg-yellow-100 text-yellow-600';
      case 'shopping':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No activities recorded yet.</p>
            <p className="mt-2 text-sm">Add some activities to track your carbon footprint!</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-3 bg-card border rounded-md"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getCategoryIcon(activity.category)}`}>
                  {activity.category.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium capitalize">
                    {activity.subCategory} ({activity.category})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.date.toLocaleDateString()} - {activity.value} {activity.unit}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge variant="outline">{activity.emissions.toFixed(2)} kg CO₂e</Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDeleteActivity(activity.id)}
                  title="Delete activity"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length > activitiesPerPage && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              <PaginationItem className="flex items-center">
                <span className="text-sm">
                  Page {currentPage} of {pageCount}
                </span>
              </PaginationItem>
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                  className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
