import React, { ReactNode } from 'react';

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  color: 'green' | 'blue' | 'amber' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200';
      case 'blue':
        return 'bg-blue-50 border-blue-200';
      case 'amber':
        return 'bg-amber-50 border-amber-200';
      case 'red':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-lg border p-3 ${getColorClasses()} transition-all duration-200 hover:shadow-sm`}>
      <div className="flex items-center space-x-2 mb-1">
        {icon}
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
  );
};

export default MetricCard;