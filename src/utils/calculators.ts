
import { emissionFactors, EmissionCategory } from './data';

export interface Activity {
  id: string;
  date: Date;
  category: EmissionCategory;
  subCategory: string;
  value: number;
  unit: string;
  emissions: number;
}

export const calculateEmissions = (
  category: EmissionCategory,
  subCategory: string,
  value: number,
  unit: string
): number => {
  let emissions = 0;

  switch (category) {
    case 'transport':
      if (subCategory in emissionFactors.transport) {
        const transport = emissionFactors.transport as any;
        emissions = transport[subCategory] * value; // value = distance in km
      }
      break;
    case 'food':
      for (const foodGroup in emissionFactors.food) {
        const group = emissionFactors.food as any;
        if (foodGroup in group && subCategory in group[foodGroup]) {
          emissions = group[foodGroup][subCategory] * value; // value = weight in kg
          break;
        }
      }
      break;
    case 'energy':
      if (subCategory in emissionFactors.energy) {
        const energy = emissionFactors.energy as any;
        emissions = energy[subCategory] * value; // value = kWh or equivalent
      }
      break;
    case 'shopping':
      if (subCategory in emissionFactors.shopping) {
        const shopping = emissionFactors.shopping as any;
        emissions = shopping[subCategory] * value; // value = number of items
      }
      break;
  }

  return parseFloat(emissions.toFixed(2)); // Round to 2 decimal places
};

export const getTotalEmissions = (activities: Activity[]): number => {
  return activities.reduce((total, activity) => total + activity.emissions, 0);
};

export const getEmissionsByCategory = (activities: Activity[]): Record<EmissionCategory, number> => {
  const result = {
    transport: 0,
    food: 0,
    energy: 0,
    shopping: 0,
  };

  activities.forEach((activity) => {
    result[activity.category] += activity.emissions;
  });

  return result;
};

export const getWeeklyEmissions = (activities: Activity[]): number[] => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const dailyEmissions: number[] = Array(7).fill(0);

  activities.forEach((activity) => {
    const activityDate = new Date(activity.date);
    if (activityDate >= oneWeekAgo && activityDate <= today) {
      const dayIndex = 6 - Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        dailyEmissions[dayIndex] += activity.emissions;
      }
    }
  });

  return dailyEmissions;
};

export const getEmissionLevel = (totalEmissions: number): 'low' | 'medium' | 'high' => {
  // These thresholds can be adjusted based on average carbon footprint data
  if (totalEmissions < 10) return 'low';
  if (totalEmissions < 30) return 'medium';
  return 'high';
};

export const generateRandomActivities = (days = 7): Activity[] => {
  const activities: Activity[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some transport activities
    activities.push({
      id: `transport-${i}-1`,
      date,
      category: 'transport',
      subCategory: 'car',
      value: Math.floor(Math.random() * 20) + 5, // 5-25 km
      unit: 'km',
      emissions: 0, // Will be calculated
    });
    
    // Add some food activities
    activities.push({
      id: `food-${i}-1`,
      date,
      category: 'food',
      subCategory: 'beef',
      value: Math.random() * 0.5, // 0-0.5 kg
      unit: 'kg',
      emissions: 0, // Will be calculated
    });
    
    // Add some energy activities
    activities.push({
      id: `energy-${i}-1`,
      date,
      category: 'energy',
      subCategory: 'electricity',
      value: Math.floor(Math.random() * 10) + 2, // 2-12 kWh
      unit: 'kWh',
      emissions: 0, // Will be calculated
    });
  }
  
  // Calculate emissions for each activity
  activities.forEach(activity => {
    activity.emissions = calculateEmissions(
      activity.category,
      activity.subCategory,
      activity.value,
      activity.unit
    );
  });
  
  return activities;
};
