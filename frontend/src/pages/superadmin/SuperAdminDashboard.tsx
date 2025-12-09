import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { superadminDashboardService } from "../../services/dashboardService";

interface RevenueReport {
  totalRevenue: number;
  totalBillings: number;
  averageBillingAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  monthlyBreakdown: Array<{ month: number; total: number; count: number }>;
  recentTransactions: Array<{
    id: number;
    accountName: string;
    amount: number;
    details: string;
    dueDate: string;
    status: string;
  }>;
}

const Dashboard: React.FC = () => {
  const [revenue, setRevenue] = useState<RevenueReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const data = await superadminDashboardService.getRevenueReport();
        setRevenue(data);
        setError(null);
      } catch (err) {
        setError("Failed to load revenue report");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  const getMonthName = (month: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month - 1] || "Unknown";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">School Dashboard</h2>
          <p className="text-sm text-gray-600">Overview of enrollment, revenue, and key metrics</p>
        </div>
        <div className="text-sm text-gray-600">Dashboard</div>
      </div>

      {/* Revenue Stats Section */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#800000] rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 mt-4">Loading revenue data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>
      ) : revenue ? (
        <>
          {/* Revenue Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-[#800000]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#800000] mt-1">{formatCurrency(revenue.totalRevenue)}</p>
                  <p className="text-xs text-gray-500 mt-1">{revenue.totalBillings} billings</p>
                </div>
                <DollarSign size={28} className="text-[#800000] opacity-20" />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending Amount</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(revenue.pendingAmount)}</p>
                  <p className="text-xs text-gray-500 mt-1">To be collected</p>
                </div>
                <CheckCircle2 size={28} className="text-green-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Overdue Amount</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(revenue.overdueAmount)}</p>
                  <p className="text-xs text-gray-500 mt-1">Past due</p>
                </div>
                <AlertCircle size={28} className="text-red-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Billing</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(revenue.averageBillingAmount)}</p>
                  <p className="text-xs text-gray-500 mt-1">Per transaction</p>
                </div>
                <TrendingUp size={28} className="text-blue-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Monthly Revenue Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#800000] mb-4">Monthly Revenue Breakdown</h3>
              {revenue.monthlyBreakdown.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data available</p>
              ) : (
                <div className="space-y-3">
                  {revenue.monthlyBreakdown.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-12 font-semibold text-[#800000]">{getMonthName(month.month)}</div>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-[#800000] h-full flex items-center justify-end pr-2 text-white text-xs font-semibold"
                            style={{
                              width: revenue.monthlyBreakdown.length > 0
                                ? `${(month.total / Math.max(...revenue.monthlyBreakdown.map((m) => m.total))) * 100}%`
                                : "0%",
                            }}
                          >
                            {month.total > 0 && formatCurrency(month.total)}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 w-16">{month.count} bills</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#800000] mb-4">Recent Transactions</h3>
              {revenue.recentTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No transactions</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left py-2 px-2 font-semibold text-gray-600">Account</th>
                        <th className="text-right py-2 px-2 font-semibold text-gray-600">Amount</th>
                        <th className="text-center py-2 px-2 font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenue.recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="font-medium text-gray-800">{transaction.accountName}</div>
                            <div className="text-xs text-gray-500">{formatDate(transaction.dueDate)}</div>
                          </td>
                          <td className="py-3 px-2 text-right font-semibold text-[#800000]">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                transaction.status === "Pending"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}

      {/* Original Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left big column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="text-sm text-gray-600 font-medium">Enrollment Situation</div>
              <div className="h-24 mt-3 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-md flex items-center justify-center text-cyan-700 font-semibold">
                Chart
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="text-sm text-gray-600 font-medium">Number of Trainees</div>
              <div className="h-24 mt-3 bg-gradient-to-r from-rose-100 to-rose-200 rounded-md flex items-center justify-center text-rose-700 font-semibold">
                Chart
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="text-sm text-gray-600 font-medium">Training Program</div>
              <div className="mt-3 text-lg font-bold text-gray-800">1,970</div>
              <div className="text-xs text-gray-500">Number of downloads today</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Musicology</h3>
              <div className="text-sm text-gray-600 font-medium">Planned number of People</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  68%
                </div>
                <div className="text-sm text-gray-700">This major requires a five-year course of study and a bachelor's degree.</div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Choir Conductor</h3>
              <div className="text-sm text-gray-600 font-medium">Planned number of People</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
                  87%
                </div>
                <div className="text-sm text-gray-700">This major requires a five-year course of study and a bachelor's degree.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <div className="text-sm text-gray-600 font-medium">Admissions Calendar</div>
            <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200 text-gray-700 text-sm">
              Jun 2, 2019 — calendar widget
            </div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800">Number of Trainees</h4>
            <div className="mt-2 text-3xl font-bold text-gray-800">780</div>
            <div className="text-sm text-gray-600">Total Number</div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800">Quick Actions</h4>
            <div className="mt-3 flex flex-col gap-2">
              <button className="px-4 py-2 bg-[#800000] text-white font-semibold rounded-lg hover:bg-[#600000] transition">
                Apply
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
