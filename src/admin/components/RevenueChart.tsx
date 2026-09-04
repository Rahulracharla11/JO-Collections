import React, { useState } from 'react';

export const RevenueChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; amount: number; x: number; y: number } | null>(null);

  const data = [
    { month: 'Jan', amount: 21500 },
    { month: 'Feb', amount: 28400 },
    { month: 'Mar', amount: 34200 },
    { month: 'Apr', amount: 31000 },
    { month: 'May', amount: 42800 },
    { month: 'Jun', amount: 39500 },
    { month: 'Jul', amount: 51200 },
    { month: 'Aug', amount: 62450 },
  ];

  const maxVal = 70000;
  const height = 220;
  const width = 500;
  const paddingX = 30;
  const paddingY = 20;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (d.amount / maxVal) * (height - 2 * paddingY);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Revenue Performance</h3>
          <p className="text-xs text-gray-500">Monthly revenue trend in ₹ INR</p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f372ac]"></span>
          <span className="font-semibold text-gray-700">Gross Sales</span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[220px] overflow-visible"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f372ac" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f372ac" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0.25, 0.5, 0.75, 1].map((fraction, i) => {
            const y = height - paddingY - fraction * (height - 2 * paddingY);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 5}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#94a3b8"
                >
                  ₹{(maxVal * fraction) / 1000}k
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#revenueGradient)" />

          {/* Main Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#f372ac"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {points.map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#ffffff"
                stroke="#f372ac"
                strokeWidth="2.5"
                className="cursor-pointer transition-transform hover:scale-150"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <text
                x={pt.x}
                y={height - 5}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
                fontWeight="500"
              >
                {pt.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              marginTop: '-8px'
            }}
          >
            <div className="font-semibold text-[#f372ac]">{hoveredPoint.month} 2026</div>
            <div className="font-bold">₹{hoveredPoint.amount.toLocaleString('en-IN')}.00</div>
          </div>
        )}
      </div>
    </div>
  );
};
