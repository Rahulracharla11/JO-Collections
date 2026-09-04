import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  icon: LucideIcon;
  description: string;
  iconColor?: string;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  description,
  iconColor = 'text-[#f372ac]',
  iconBg = 'bg-[#fdf2f6]'
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
          <Icon className="w-6 h-6 stroke-[1.75]" />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4 text-xs">
        <span
          className={`inline-flex items-center space-x-1 font-semibold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{change}</span>
        </span>
        <span className="text-gray-400">{description}</span>
      </div>
    </div>
  );
};
