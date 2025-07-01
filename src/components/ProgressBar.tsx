import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  stepTitles 
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-black text-snow' 
                  : index === currentStep 
                    ? 'bg-almond text-bistre border-2 border-black' 
                    : 'bg-cinereous text-snow'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs mt-2 font-medium ${
              index <= currentStep ? 'text-black' : 'text-cinereous'
            }`}>
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-cinereous/30 rounded-full h-2">
        <div 
          className="bg-black h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};