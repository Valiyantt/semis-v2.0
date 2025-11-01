import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description }) => (
  <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
    <p className="text-2xl font-semibold text-[#800000] mt-2">{value}</p>
    {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
  </div>
);

export default DashboardCard;
