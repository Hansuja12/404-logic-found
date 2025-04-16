
import { Activity, getEmissionLevel, getTotalEmissions } from '@/utils/calculators';
import { cn } from '@/lib/utils';

interface EcoAvatarProps {
  activities: Activity[];
}

const EcoAvatar: React.FC<EcoAvatarProps> = ({ activities }) => {
  const totalEmissions = getTotalEmissions(activities);
  const emissionLevel = getEmissionLevel(totalEmissions);
  
  const getAvatarEmoji = () => {
    switch (emissionLevel) {
      case 'low':
        return '😊';
      case 'medium':
        return '🙂';
      case 'high':
        return '😟';
      default:
        return '🌱';
    }
  };
  
  const getAvatarBackground = () => {
    switch (emissionLevel) {
      case 'low':
        return 'bg-gradient-to-br from-green-100 to-green-200';
      case 'medium':
        return 'bg-gradient-to-br from-yellow-100 to-yellow-200';
      case 'high':
        return 'bg-gradient-to-br from-red-100 to-red-200';
      default:
        return 'bg-gradient-to-br from-blue-100 to-blue-200';
    }
  };
  
  const getMessage = () => {
    switch (emissionLevel) {
      case 'low':
        return "I'm happy! You're helping the planet!";
      case 'medium':
        return "I'm doing okay. Let's keep improving!";
      case 'high':
        return "I'm worried about our planet! Let's reduce our impact.";
      default:
        return "Hello! I'm your Eco Avatar. Track activities to see me change!";
    }
  };
  
  return (
    <div className="text-center">
      <div className={cn(
        "w-28 h-28 rounded-full mx-auto flex items-center justify-center text-5xl animate-pulse-slow",
        getAvatarBackground()
      )}>
        {getAvatarEmoji()}
      </div>
      <p className="mt-3 text-sm font-medium">{getMessage()}</p>
    </div>
  );
};

export default EcoAvatar;
