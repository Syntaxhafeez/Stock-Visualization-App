import React from 'react';
import { Building2 } from 'lucide-react';

interface CompanyListProps {
  indices: string[];
  selectedIndex: string | null;
  onSelectIndex: (index: string) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  indices = [], // Provide default empty array
  selectedIndex,
  onSelectIndex,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Building2 className="w-6 h-6" />
        NSE Indices
      </h2>
      <div className="space-y-2">
        {Array.isArray(indices) && indices.map((index) => (
          <button
            key={index}
            onClick={() => onSelectIndex(index)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              selectedIndex === index
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {index}
          </button>
        ))}
        {(!Array.isArray(indices) || indices.length === 0) && (
          <p className="text-gray-500 text-center py-4">No indices available</p>
        )}
      </div>
    </div>
  );
}

export default CompanyList;