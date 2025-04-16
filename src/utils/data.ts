
// Emission factors for various activities (in kg CO2e)
export const emissionFactors = {
  transport: {
    car: {
      petrol: 0.17, // kg CO2e per km
      diesel: 0.15, // kg CO2e per km
      electric: 0.05, // kg CO2e per km
    },
    publicTransport: {
      bus: 0.09, // kg CO2e per km
      train: 0.04, // kg CO2e per km
      subway: 0.03, // kg CO2e per km
    },
    airplane: 0.2, // kg CO2e per passenger km
    bicycle: 0, // kg CO2e per km
    walking: 0, // kg CO2e per km
  },
  food: {
    meat: {
      beef: 27, // kg CO2e per kg
      lamb: 39, // kg CO2e per kg
      pork: 12, // kg CO2e per kg
      chicken: 6.9, // kg CO2e per kg
    },
    dairy: {
      milk: 1.9, // kg CO2e per kg
      cheese: 13.5, // kg CO2e per kg
      eggs: 4.5, // kg CO2e per kg
    },
    plantBased: {
      vegetables: 2, // kg CO2e per kg
      fruits: 1.1, // kg CO2e per kg
      cereals: 1.4, // kg CO2e per kg
      legumes: 0.9, // kg CO2e per kg
    },
  },
  energy: {
    electricity: 0.233, // kg CO2e per kWh (varies by country)
    naturalGas: 0.184, // kg CO2e per kWh
    heating: 0.27, // kg CO2e per kWh
  },
  shopping: {
    clothing: 20, // kg CO2e per item (average)
    electronics: 80, // kg CO2e per item (average)
    furniture: 90, // kg CO2e per item (average)
  },
};

export const activityTypes = [
  { id: "transport", label: "Transport", icon: "car" },
  { id: "food", label: "Food", icon: "utensils" },
  { id: "energy", label: "Energy", icon: "bolt" },
  { id: "shopping", label: "Shopping", icon: "shopping-bag" },
];

export type EmissionCategory = "transport" | "food" | "energy" | "shopping";

export const tips = {
  transport: [
    "Try walking or biking for short trips instead of driving.",
    "Consider carpooling with colleagues for your commute.",
    "Use public transportation when possible to reduce emissions.",
    "If you need a car, consider an electric or hybrid vehicle.",
  ],
  food: [
    "Try meat-free Mondays to reduce your consumption of animal products.",
    "Choose locally grown and seasonal produce to reduce transportation emissions.",
    "Reduce food waste by planning meals and storing food properly.",
    "Consider growing some of your own vegetables and herbs.",
  ],
  energy: [
    "Turn off lights and unplug electronics when not in use.",
    "Use energy-efficient appliances and LED light bulbs.",
    "Lower your thermostat by 2 degrees in winter and raise it by 2 in summer.",
    "Consider installing solar panels or switching to a renewable energy supplier.",
  ],
  shopping: [
    "Buy second-hand or repair items instead of buying new ones.",
    "Choose products with minimal or recyclable packaging.",
    "Invest in quality items that will last longer.",
    "Borrow or rent items you don't use frequently.",
  ],
};
