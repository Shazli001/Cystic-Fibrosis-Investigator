import React, { useMemo } from 'react';
import { Symptom, AgeGroup, SymptomCategory } from '../types';
import { SYMPTOM_DATABASE } from '../constants';
import { Check, Info } from 'lucide-react';

interface Props {
  ageGroup: AgeGroup;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const SymptomSelector: React.FC<Props> = ({ ageGroup, selectedIds, onToggle }) => {
  
  const relevantSymptoms = useMemo(() => {
    return SYMPTOM_DATABASE.filter(s => s.ageGroups.includes(ageGroup));
  }, [ageGroup]);

  const categories = [
    SymptomCategory.PULMONARY,
    SymptomCategory.PANCREATIC_GI,
    SymptomCategory.LIVER,
    SymptomCategory.OTHER
  ];

  return (
    <div className="space-y-8">
      {categories.map(cat => {
        const catSymptoms = relevantSymptoms.filter(s => s.category === cat);
        if (catSymptoms.length === 0) return null;

        return (
          <div key={cat} className="animate-fadeIn">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              {cat} <span className="text-sm font-normal text-slate-500">({catSymptoms.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catSymptoms.map(symptom => {
                const isSelected = selectedIds.includes(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    onClick={() => onToggle(symptom.id)}
                    className={`relative group p-4 rounded-xl border-2 text-left transition-all duration-200 flex flex-col justify-between h-full ${
                      isSelected 
                        ? 'border-purple-600 bg-purple-50 shadow-md' 
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full mb-2">
                      <span className={`font-medium pr-2 ${isSelected ? 'text-purple-900' : 'text-slate-800'}`}>
                        {symptom.label}
                      </span>
                      {isSelected && (
                        <div className="bg-purple-600 text-white rounded-full p-1 flex-shrink-0">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    
                    {/* Description is always visible now for mobile friendliness */}
                    <div className="text-xs text-slate-500 mt-auto pt-2 border-t border-slate-100 flex items-start gap-1">
                      <Info size={12} className="mt-0.5 flex-shrink-0" />
                      {symptom.description}
                    </div>

                    {/* Red Flag Indicator */}
                    {symptom.isRedFlag && (
                      <span className="absolute -top-2 -right-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full border border-red-200">
                        HIGH SPECIFICITY
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SymptomSelector;