import React from 'react';

interface CookingTypesProps {
  selectedTypes: string[];
  otherType: string;
  onTypeChange: (types: string[]) => void;
  onOtherTypeChange: (value: string) => void;
}

const COOKING_TYPES = ['South Indian', 'North Indian', 'Chinese', 'Continental'];

export default function CookingTypes({ 
  selectedTypes, 
  otherType, 
  onTypeChange, 
  onOtherTypeChange 
}: CookingTypesProps) {
  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  return (
    <div className="space-y-3">
      <p className="text-white mb-2">Cooking Types / पाक विधियाँ</p>
      {COOKING_TYPES.map((type) => (
        <div key={type} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeChange(type)}
            className="w-4 h-4"
          />
          <label htmlFor={type} className="text-white">{type}</label>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="other"
          checked={selectedTypes.includes('Other')}
          onChange={() => handleTypeChange('Other')}
          className="w-4 h-4"
        />
        <label htmlFor="other" className="text-white">Any Other / अन्य</label>
      </div>
      {selectedTypes.includes('Other') && (
        <input
          type="text"
          value={otherType}
          onChange={(e) => onOtherTypeChange(e.target.value)}
          placeholder="Please specify / कृपया बताएं"
          className="w-full p-3 rounded bg-white/20 backdrop-blur-sm mt-2"
        />
      )}
    </div>
  );
}