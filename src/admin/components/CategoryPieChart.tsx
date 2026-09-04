import React from 'react';

export const CategoryPieChart: React.FC = () => {
  const categories = [
    { name: 'Sarees', percentage: 58, color: '#f372ac', amount: '₹1,48,200' },
    { name: 'Jewellery', percentage: 22, color: '#f59e0b', amount: '₹56,100' },
    { name: 'Dress Materials', percentage: 12, color: '#0ea5e9', amount: '₹30,600' },
    { name: 'Kurtis', percentage: 8, color: '#8b5cf6', amount: '₹20,400' },
  ];

  // SVG Doughnut geometry
  let cumulative = 0;
  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-gray-900">Sales by Category</h3>
        <p className="text-xs text-gray-500">Distribution of store purchases</p>
      </div>

      <div className="my-6 flex items-center justify-center relative">
        <svg viewBox="0 0 160 160" className="w-40 h-40 transform -rotate-90">
          {categories.map((cat, i) => {
            const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((cumulative / 100) * circumference);
            cumulative += cat.percentage;

            return (
              <circle
                key={i}
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke={cat.color}
                strokeWidth="18"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 hover:opacity-85 cursor-pointer"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xl font-bold text-gray-900">100%</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total Sales</span>
        </div>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-gray-50">
        {categories.map(cat => (
          <div key={cat.name} className="flex items-center space-x-2 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: cat.color }}
            />
            <div className="flex-1 truncate">
              <span className="text-gray-600 font-medium block truncate">{cat.name}</span>
              <span className="text-gray-900 font-bold">{cat.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
