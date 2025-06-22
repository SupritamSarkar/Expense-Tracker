import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts'

const CustomAreaChart = ({ data = [], color = "#8A2BE2", showTextAnchor = false, xKey = "name" }) => {
  return (
    <div className="w-full h-80 text-lg font-medium">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={xKey}
            interval={0}
            angle={-60}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 15 }}
          />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorGradient)"  // 🎨 Fill with gradient
            dot={true}
            activeDot={{ r: 6 }}
          >
            {showTextAnchor && (
              <LabelList
                dataKey="amount"
                position="top"
                formatter={(value) => `₹${value}`}
                style={{ fontSize: 15, fill: "#333" }}
              />
            )}
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomAreaChart
