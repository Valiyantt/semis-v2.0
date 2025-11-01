import React from "react";

interface DashboardCardProps {
  title: string;
  value: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
      <h2 className="text-gray-700 text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold text-[var(--color-maroon)] mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
