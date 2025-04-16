
import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, calculateEmissions } from '@/utils/calculators';
import { Slider } from '@/components/ui/slider';
import { useState, useEffect } from 'react';

interface ActivityInputProps {
  category: string;
  options: { [key: string]: any };
  onChange: (activity: Partial<Activity>) => void;
  value: number;
}

const ActivityInput: React.FC<ActivityInputProps> = ({ 
  category, 
  options, 
  onChange,
  value
}) => {
  const id = useId();
  const defaultSubCategory = Object.keys(options)[0];
  const [subCategory, setSubCategory] = useState<string>(defaultSubCategory);
  const [currentValue, setCurrentValue] = useState<number>(value || 0);
  
  // Move the function definition before its usage
  const getUnitForCategory = (category: string) => {
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
  
  const unit = getUnitForCategory(category);
  
  useEffect(() => {
    setCurrentValue(value || 0);
  }, [value]);
  
  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value);
    
    onChange({ 
      category: category as any, 
      subCategory: value 
    });
  };
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setCurrentValue(newValue);
      
      const emissions = calculateEmissions(
        category as any, 
        subCategory, 
        newValue, 
        unit
      );
      
      onChange({ 
        value: newValue, 
        emissions 
      });
    }
  };
  
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setCurrentValue(newValue);
    
    const emissions = calculateEmissions(
      category as any,
      subCategory,
      newValue,
      unit
    );
    
    onChange({
      value: newValue,
      emissions
    });
  };
  
  const getMaxValueForCategory = (category: string) => {
    switch (category) {
      case 'transport':
        return 100; // kilometers
      case 'food':
        return 5; // kilograms
      case 'energy':
        return 50; // kWh
      case 'shopping':
        return 10; // items
      default:
        return 100;
    }
  };
  
  const getStepForCategory = (category: string) => {
    switch (category) {
      case 'food':
        return 0.1; // smaller steps for food (kg)
      default:
        return 1; // integer steps for others
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${id}-subcategory`}>Type</Label>
          <Select 
            name="subCategory"
            onValueChange={handleSubCategoryChange}
            defaultValue={defaultSubCategory}
            value={subCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(options).map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor={`${id}-value`}>Amount</Label>
          <div className="flex">
            <Input
              id={`${id}-value`}
              name="value"
              type="number"
              min="0"
              step={getStepForCategory(category)}
              value={currentValue || ''}
              onChange={handleValueChange}
              className="rounded-r-none"
              placeholder="0"
            />
            <Input 
              name="unit" 
              value={unit} 
              readOnly
              className="w-16 rounded-l-none bg-muted"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-2">
        <Label className="mb-6 block">Adjust with slider:</Label>
        <Slider
          defaultValue={[0]}
          value={[currentValue || 0]}
          max={getMaxValueForCategory(category)}
          step={getStepForCategory(category)}
          onValueChange={handleSliderChange}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0 {unit}</span>
          <span>{getMaxValueForCategory(category)} {unit}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityInput;
