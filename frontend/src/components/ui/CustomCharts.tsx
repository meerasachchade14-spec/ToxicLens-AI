import React, { useState } from "react";

// ==========================================
// 1. LINE CHART: Weekly Scan Trends
// ==========================================
interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, height = 200 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const padding = 40;
  const chartWidth = 500;
  const chartHeight = height;

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const minVal = 0;
  const range = maxVal - minVal;

  // Map points to SVG coordinates
  const points = data.map((d, index) => {
    const x = padding + (index * (chartWidth - padding * 2)) / (data.length - 1);
    const y = chartHeight - padding - ((d.value - minVal) * (chartHeight - padding * 2)) / range;
    return { x, y, ...d };
  });

  // Build bezier curve path string
  let linePath = "";
  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX1 = curr.x + (next.x - curr.x) / 3;
      const cpY1 = curr.y;
      const cpX2 = curr.x + (2 * (next.x - curr.x)) / 3;
      const cpY2 = next.y;
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
  }

  // Build closed path for area gradient fill
  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
    : "";

  return (
    <div className="relative w-full overflow-hidden">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
        <defs>
          <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="50%" stopColor="var(--secondary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * (chartHeight - padding * 2);
          const gridVal = Math.round(maxVal - ratio * range);
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                fill="var(--text-secondary)"
                fontSize="10"
                textAnchor="end"
                className="font-mono opacity-80"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        {/* Area Gradient Fill */}
        {areaPath && <path d={areaPath} fill="url(#lineGlow)" />}

        {/* Curved Line */}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineStroke)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="chart-path"
          />
        )}

        {/* X Axis Labels */}
        {points.map((p, index) => (
          <text
            key={index}
            x={p.x}
            y={chartHeight - 12}
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
            className="font-medium opacity-80"
          >
            {p.label}
          </text>
        ))}

        {/* Interactive Dots and Hover Bars */}
        {points.map((p, index) => (
          <g
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-pointer"
          >
            {/* Invisible large hover capture area */}
            <rect
              x={p.x - 20}
              y={padding}
              width="40"
              height={chartHeight - padding * 2}
              fill="transparent"
            />
            {/* Hover vertical reference line */}
            {hoveredIndex === index && (
              <line
                x1={p.x}
                y1={padding}
                x2={p.x}
                y2={chartHeight - padding}
                stroke="var(--primary)"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            )}
            {/* Data point circle */}
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIndex === index ? 6 : 4}
              fill={hoveredIndex === index ? "var(--accent)" : "var(--primary)"}
              stroke="var(--background)"
              strokeWidth="2.5"
              style={{ transition: "all 0.2s ease" }}
            />
          </g>
        ))}
      </svg>

      {/* Floating Tooltip HTML Overlay */}
      {hoveredIndex !== null && points[hoveredIndex] && (
        <div
          className="absolute glass-panel p-2 rounded-lg text-xs pointer-events-none transition-all duration-150 shadow-md border border-primary/20"
          style={{
            left: `${(points[hoveredIndex].x / chartWidth) * 100}%`,
            top: `${(points[hoveredIndex].y / chartHeight) * 100 - 25}%`,
            transform: "translateX(-50%) translateY(-100%)",
          }}
        >
          <div className="font-semibold text-main">{points[hoveredIndex].label}</div>
          <div className="text-primary font-mono font-bold mt-0.5">
            Scans: {points[hoveredIndex].value}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. BAR CHART: Monthly Abuse Severity
// ==========================================
interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, height = 200 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const padding = 40;
  const chartWidth = 500;
  const chartHeight = height;

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const range = maxVal;

  const barWidth = Math.max(12, (chartWidth - padding * 2) / data.length - 18);

  const points = data.map((d, index) => {
    const x = padding + index * ((chartWidth - padding * 2) / data.length) + (chartWidth - padding * 2) / data.length / 2 - barWidth / 2;
    const barHeight = ((d.value) * (chartHeight - padding * 2)) / range;
    const y = chartHeight - padding - barHeight;
    return { x, y, h: barHeight, ...d };
  });

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
        <defs>
          <linearGradient id="barGradPrimary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="barGradAccent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="barGradDanger" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--danger)" />
            <stop offset="100%" stopColor="var(--danger)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * (chartHeight - padding * 2);
          const gridVal = Math.round(maxVal - ratio * range);
          return (
            <g key={i}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="var(--border-color)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={y + 4}
                fill="var(--text-secondary)"
                fontSize="10"
                textAnchor="end"
                className="font-mono opacity-80"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {points.map((p, index) => {
          const isHovered = hoveredIndex === index;
          const barColor = p.color || "url(#barGradPrimary)";
          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              <rect
                x={p.x}
                y={p.y}
                width={barWidth}
                height={Math.max(p.h, 2)}
                rx="4"
                fill={barColor}
                opacity={hoveredIndex === null || isHovered ? 1 : 0.6}
                stroke={isHovered ? "var(--text-primary)" : "none"}
                strokeWidth="1"
                style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
              {/* Invisible large hover selection box */}
              <rect
                x={p.x - 5}
                y={padding}
                width={barWidth + 10}
                height={chartHeight - padding * 2}
                fill="transparent"
              />
            </g>
          );
        })}

        {/* X Axis Labels */}
        {points.map((p, index) => (
          <text
            key={index}
            x={p.x + barWidth / 2}
            y={chartHeight - 12}
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
            className="font-medium opacity-80"
          >
            {p.label}
          </text>
        ))}
      </svg>

      {/* Floating Tooltip HTML Overlay */}
      {hoveredIndex !== null && points[hoveredIndex] && (
        <div
          className="absolute glass-panel p-2 rounded-lg text-xs pointer-events-none transition-all duration-150 shadow-md border border-primary/20"
          style={{
            left: `${((points[hoveredIndex].x + barWidth / 2) / chartWidth) * 100}%`,
            top: `${(points[hoveredIndex].y / chartHeight) * 100 - 15}%`,
            transform: "translateX(-50%) translateY(-100%)",
          }}
        >
          <div className="font-semibold text-main">{points[hoveredIndex].label}</div>
          <div className="text-secondary font-mono font-bold mt-0.5">
            Scans: {points[hoveredIndex].value}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. PIE/DONUT CHART: Safety Split
// ==========================================
interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, size = 180 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.value, 0);
  const radius = 50;
  const strokeWidth = 14;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * radius; // 314.15

  let accumulatedPercentage = 0;

  const slices = data.map((d) => {
    const percentage = total > 0 ? (d.value / total) * 100 : 0;
    const strokeDashOffset = circumference - (percentage * circumference) / 100;
    const strokeDashArray = `${circumference}`;
    const rotate = (accumulatedPercentage * 360) / 100;
    accumulatedPercentage += percentage;

    return {
      percentage,
      strokeDashOffset,
      strokeDashArray,
      rotate,
      ...d,
    };
  });

  return (
    <div className="flex items-center justify-around flex-wrap gap-4 w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 140 140" className="w-full h-full rotate-[-90deg]">
          {slices.map((slice, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={slice.strokeDashArray}
                strokeDashoffset={slice.strokeDashOffset}
                transform={`rotate(${slice.rotate} ${cx} ${cy})`}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 8px ${slice.color}77)` : "none",
                }}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {hoveredIndex === null ? (
            <>
              <span className="text-xl font-bold text-main">{total}</span>
              <span className="text-[10px] text-sub uppercase tracking-wider">Total Scans</span>
            </>
          ) : (
            <>
              <span className="text-xl font-bold" style={{ color: slices[hoveredIndex].color }}>
                {Math.round(slices[hoveredIndex].percentage)}%
              </span>
              <span className="text-[10px] text-sub uppercase tracking-wider">
                {slices[hoveredIndex].label}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-2">
        {slices.map((slice, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 cursor-pointer text-xs font-medium"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5 }}
          >
            <span
              className="w-3.5 h-3.5 rounded-full inline-block"
              style={{
                backgroundColor: slice.color,
                boxShadow: `0 0 8px ${slice.color}66`,
              }}
            />
            <div className="flex flex-col">
              <span className="text-main font-semibold">{slice.label}</span>
              <span className="text-sub text-[10px]">
                {slice.value} Scans ({Math.round(slice.percentage)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. RADIAL/CONCENTRIC BAR CHART: Emotions
// ==========================================
interface RadialChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

export const RadialChart: React.FC<RadialChartProps> = ({ data, size = 180 }) => {
  const cx = 90;
  const cy = 90;

  return (
    <div className="flex items-center justify-around flex-wrap gap-4 w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 180 180" className="w-full h-full rotate-[-90deg]">
          {data.map((d, index) => {
            const currentRadius = 35 + index * 12;
            const currentCircumference = 2 * Math.PI * currentRadius;
            const scorePercent = Math.min(100, Math.max(0, d.value));
            const strokeDashOffset = currentCircumference - (scorePercent * currentCircumference) / 100;

            return (
              <g key={index}>
                {/* Background Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={currentRadius}
                  fill="transparent"
                  stroke="var(--border-color)"
                  strokeWidth="6"
                  opacity="0.3"
                />
                {/* Score Segment */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={currentRadius}
                  fill="transparent"
                  stroke={d.color}
                  strokeWidth="7"
                  strokeDasharray={currentCircumference}
                  strokeDashoffset={strokeDashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                  style={{
                    filter: `drop-shadow(0 0 4px ${d.color}33)`,
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-1.5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-[11px]">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sub font-medium w-16">{item.label}</span>
            <span className="text-main font-semibold font-mono">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
