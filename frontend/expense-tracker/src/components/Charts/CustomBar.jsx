import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
const CustomBar = ({ data = [], colors = [], showTextAnchor, xKey = "name" }) => {
  return (
    <div className="w-full h-80 text-lg font-medium">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length] || "#8884d8"} />
            ))}
            {showTextAnchor && (
              <LabelList
                dataKey="amount"
                position="top"
                formatter={(value) => `₹${value}`}
              />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBar;
