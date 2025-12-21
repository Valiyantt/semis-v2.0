import React, { useState } from "react";
import { CreditCard, DollarSign, TrendingUp, AlertCircle, Eye, CheckCircle, Clock, Trash2, FileText } from "lucide-react";

interface BillingRecord {
  id: number;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  paymentDate?: string;
}

const BillingDashboard: React.FC = () => {
  const [billings, setBillings] = useState<BillingRecord[]>([
    {
      id: 1,
      studentId: "STU001",
      studentName: "John Smith",
      amount: 5000,
      dueDate: "2024-12-15",
      status: "paid",
      description: "Tuition Fee - Q1 2024-2025",
      paymentDate: "2024-12-10",
    },
    {
      id: 2,
      studentId: "STU002",
      studentName: "Emma Johnson",
      amount: 5000,
      dueDate: "2024-12-15",
      status: "paid",
      description: "Tuition Fee - Q1 2024-2025",
      paymentDate: "2024-12-12",
    },
    {
      id: 3,
      studentId: "STU003",
      studentName: "Michael Brown",
      amount: 5000,
      dueDate: "2024-12-15",
      status: "pending",
      description: "Tuition Fee - Q1 2024-2025",
    },
    {
      id: 4,
      studentId: "STU004",
      studentName: "Sarah Davis",
      amount: 2500,
      dueDate: "2024-12-10",
      status: "overdue",
      description: "Library Fine & Fees",
    },
    {
      id: 5,
      studentId: "STU005",
      studentName: "David Wilson",
      amount: 5000,
      dueDate: "2024-12-20",
      status: "pending",
      description: "Tuition Fee - Q1 2024-2025",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<BillingRecord | null>(null);

  const filteredBillings = billings.filter((billing) => {
    const matchesSearch =
      billing.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      billing.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "paid") return matchesSearch && billing.status === "paid";
    if (selectedTab === "pending") return matchesSearch && billing.status === "pending";
    if (selectedTab === "overdue") return matchesSearch && billing.status === "overdue";
    return matchesSearch;
  });

  const stats = {
    totalAmount: billings.reduce((sum, b) => sum + b.amount, 0),
    paidAmount: billings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0),
    pendingAmount: billings.filter((b) => b.status === "pending").reduce((sum, b) => sum + b.amount, 0),
    overdueAmount: billings.filter((b) => b.status === "overdue").reduce((sum, b) => sum + b.amount, 0),
    paid: billings.filter((b) => b.status === "paid").length,
    pending: billings.filter((b) => b.status === "pending").length,
    overdue: billings.filter((b) => b.status === "overdue").length,
  };

  const collectionRate = ((stats.paidAmount / stats.totalAmount) * 100).toFixed(1);

  const handleMarkAsPaid = (billingId: number) => {
    setBillings((prev) =>
      prev.map((b) =>
        b.id === billingId
          ? { ...b, status: "paid" as const, paymentDate: new Date().toISOString().split("T")[0] }
          : b
      )
    );
    setShowDetail(false);
  };

  const handleViewDetail = (billing: BillingRecord) => {
    setSelectedBilling(billing);
    setShowDetail(true);
  };

  const handleDelete = (billingId: number) => {
    setBillings((prev) => prev.filter((b) => b.id !== billingId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1"><CheckCircle size={12} /> Paid</span>;
      case "pending":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case "overdue":
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1"><AlertCircle size={12} /> Overdue</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Billing & Payment Management</h2>
          <p className="text-sm text-gray-600">Track and manage student payment transactions</p>
        </div>
        <div className="text-sm text-gray-600">Billing</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Total Receivable</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">${stats.totalAmount.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Amount Paid</div>
              <div className="mt-2 text-3xl font-bold text-green-600">${stats.paidAmount.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Pending Amount</div>
              <div className="mt-2 text-3xl font-bold text-yellow-600">${stats.pendingAmount.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Overdue Amount</div>
              <div className="mt-2 text-3xl font-bold text-red-600">${stats.overdueAmount.toLocaleString()}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Collection Rate */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={20} />
            Collection Rate
          </h3>
          <span className="text-2xl font-bold text-green-600">{collectionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all"
            style={{ width: `${collectionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {stats.paid} payments received out of {billings.length} total records
        </p>
      </div>

      {/* Billing Records Table */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* Tabs and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "all"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab("paid")}
                className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-1 ${
                  selectedTab === "paid"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CheckCircle size={16} /> Paid ({stats.paid})
              </button>
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-1 ${
                  selectedTab === "pending"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Clock size={16} /> Pending ({stats.pending})
              </button>
              <button
                onClick={() => setSelectedTab("overdue")}
                className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-1 ${
                  selectedTab === "overdue"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <AlertCircle size={16} /> Overdue ({stats.overdue})
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBillings.map((billing) => (
                <tr key={billing.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{billing.studentId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{billing.studentName}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${billing.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{billing.dueDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(billing.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{billing.description}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetail(billing)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {billing.status !== "paid" && (
                        <button
                          onClick={() => handleMarkAsPaid(billing.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                          title="Mark as Paid"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(billing.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBillings.length === 0 && (
          <div className="p-8 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">No billing records found</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard size={18} />
            Payment Methods
          </h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 py-2 px-3 bg-blue-50 rounded-lg">💳 Online Payment Portal</p>
            <p className="text-sm text-gray-600 py-2 px-3 bg-green-50 rounded-lg">🏦 Bank Transfer</p>
            <p className="text-sm text-gray-600 py-2 px-3 bg-purple-50 rounded-lg">💰 Check Payment</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={18} />
            Reports
          </h4>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-semibold">
              📋 Generate Invoice
            </button>
            <button className="w-full text-left px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-semibold">
              📊 Collection Report
            </button>
            <button className="w-full text-left px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-semibold">
              ⚠️ Overdue Report
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && selectedBilling && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#800000]">Payment Details</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold text-gray-800">{selectedBilling.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-800">{selectedBilling.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-semibold text-gray-800 text-lg">${selectedBilling.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-semibold text-gray-800">{selectedBilling.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold text-gray-800">{selectedBilling.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="mt-1">{getStatusBadge(selectedBilling.status)}</div>
              </div>
              {selectedBilling.paymentDate && (
                <div>
                  <p className="text-sm text-gray-600">Payment Date</p>
                  <p className="font-semibold text-gray-800">{selectedBilling.paymentDate}</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              {selectedBilling.status !== "paid" && (
                <button
                  onClick={() => handleMarkAsPaid(selectedBilling.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Mark as Paid
                </button>
              )}
              <button
                onClick={() => setShowDetail(false)}
                className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingDashboard;
