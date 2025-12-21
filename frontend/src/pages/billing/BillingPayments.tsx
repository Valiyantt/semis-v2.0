import React, { useState } from "react";
import { CreditCard, Check, XCircle, Clock, Receipt, Search, Plus, Eye } from "lucide-react";

interface Payment {
  id: number;
  paymentId: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  method: "online" | "bank_transfer" | "check" | "cash";
  status: "completed" | "pending" | "failed";
  invoiceId: string;
}

const BillingPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      paymentId: "PAY-2024-001",
      studentId: "STU001",
      studentName: "John Smith",
      amount: 5000,
      paymentDate: "2024-12-10",
      method: "online",
      status: "completed",
      invoiceId: "INV-2024-001",
    },
    {
      id: 2,
      paymentId: "PAY-2024-002",
      studentId: "STU002",
      studentName: "Emma Johnson",
      amount: 5000,
      paymentDate: "2024-12-12",
      method: "bank_transfer",
      status: "completed",
      invoiceId: "INV-2024-002",
    },
    {
      id: 3,
      paymentId: "PAY-2024-003",
      studentId: "STU003",
      studentName: "Michael Brown",
      amount: 2500,
      paymentDate: "2024-12-20",
      method: "online",
      status: "pending",
      invoiceId: "INV-2024-003",
    },
    {
      id: 4,
      paymentId: "PAY-2024-004",
      studentId: "STU004",
      studentName: "Sarah Davis",
      amount: 5000,
      paymentDate: "2024-12-18",
      method: "check",
      status: "completed",
      invoiceId: "INV-2024-004",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "completed" | "pending" | "failed">("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "completed") return matchesSearch && payment.status === "completed";
    if (selectedTab === "pending") return matchesSearch && payment.status === "pending";
    if (selectedTab === "failed") return matchesSearch && payment.status === "failed";
    return matchesSearch;
  });

  const stats = {
    totalProcessed: payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0),
    completed: payments.filter((p) => p.status === "completed").length,
    pending: payments.filter((p) => p.status === "pending").length,
    failed: payments.filter((p) => p.status === "failed").length,
  };

  const getMethodBadge = (method: string) => {
    const methods: { [key: string]: string } = {
      online: "💳 Online",
      bank_transfer: "🏦 Bank Transfer",
      check: "✓ Check",
      cash: "💰 Cash",
    };
    return methods[method] || method;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1"><Check size={12} /> Completed</span>;
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case "failed":
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1"><XCircle size={12} /> Failed</span>;
      default:
        return null;
    }
  };

  const handleViewDetail = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Payment Processing</h2>
          <p className="text-sm text-gray-600">Track and manage student payment transactions</p>
        </div>
        <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold flex items-center gap-2">
          <Plus size={18} />
          New Payment
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Total Processed</div>
              <div className="mt-2 text-3xl font-bold text-green-600">${stats.totalProcessed.toLocaleString()}</div>
            </div>
            <Check size={24} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Completed</div>
              <div className="mt-2 text-3xl font-bold text-green-600">{stats.completed}</div>
            </div>
            <Check size={24} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Pending</div>
              <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Failed</div>
              <div className="mt-2 text-3xl font-bold text-red-600">{stats.failed}</div>
            </div>
            <XCircle size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                onClick={() => setSelectedTab("completed")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "completed"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Completed ({stats.completed})
              </button>
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "pending"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending ({stats.pending})
              </button>
            </div>

            <div className="w-full sm:w-64 relative">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Method</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{payment.paymentId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>{payment.studentName}</div>
                    <div className="text-xs text-gray-500">{payment.studentId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.paymentDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{getMethodBadge(payment.method)}</td>
                  <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewDetail(payment)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#800000]">Payment Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600">Payment ID</p>
                <p className="font-semibold text-gray-800">{selectedPayment.paymentId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Student</p>
                <p className="font-semibold text-gray-800">{selectedPayment.studentName}</p>
                <p className="text-sm text-gray-600">{selectedPayment.studentId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Invoice ID</p>
                <p className="font-semibold text-gray-800">{selectedPayment.invoiceId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-semibold text-gray-800 text-lg">${selectedPayment.amount.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Payment Date</p>
                <p className="font-semibold text-gray-800">{selectedPayment.paymentDate}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-800">{getMethodBadge(selectedPayment.method)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500">Transaction Reference</p>
                <p className="font-mono text-xs text-gray-700 break-all">TXN-{selectedPayment.paymentId}-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
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

export default BillingPayments;
