import React, { useState } from "react";
import { FileText, Download, Eye, Mail, Trash2, Search, Plus, Send } from "lucide-react";

interface Invoice {
  id: number;
  invoiceId: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: "sent" | "pending" | "paid" | "overdue";
  description: string;
}

const BillingInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceId: "INV-2024-001",
      studentId: "STU001",
      studentName: "John Smith",
      amount: 5000,
      dueDate: "2024-12-15",
      issueDate: "2024-12-01",
      status: "paid",
      description: "Tuition Fee - Q1 2024-2025",
    },
    {
      id: 2,
      invoiceId: "INV-2024-002",
      studentId: "STU002",
      studentName: "Emma Johnson",
      amount: 5000,
      dueDate: "2024-12-15",
      issueDate: "2024-12-01",
      status: "paid",
      description: "Tuition Fee - Q1 2024-2025",
    },
    {
      id: 3,
      invoiceId: "INV-2024-003",
      studentId: "STU003",
      studentName: "Michael Brown",
      amount: 5000,
      dueDate: "2024-12-15",
      issueDate: "2024-12-05",
      status: "pending",
      description: "Tuition Fee - Q1 2024-2025",
    },
    {
      id: 4,
      invoiceId: "INV-2024-004",
      studentId: "STU004",
      studentName: "Sarah Davis",
      amount: 2500,
      dueDate: "2024-12-10",
      issueDate: "2024-11-28",
      status: "overdue",
      description: "Library Fine & Fees",
    },
    {
      id: 5,
      invoiceId: "INV-2024-005",
      studentId: "STU005",
      studentName: "David Wilson",
      amount: 5000,
      dueDate: "2024-12-20",
      issueDate: "2024-12-08",
      status: "sent",
      description: "Tuition Fee - Q1 2024-2025",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "sent" | "pending" | "paid" | "overdue">("all");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "sent") return matchesSearch && invoice.status === "sent";
    if (selectedTab === "pending") return matchesSearch && invoice.status === "pending";
    if (selectedTab === "paid") return matchesSearch && invoice.status === "paid";
    if (selectedTab === "overdue") return matchesSearch && invoice.status === "overdue";
    return matchesSearch;
  });

  const stats = {
    total: invoices.length,
    sent: invoices.filter((i) => i.status === "sent").length,
    pending: invoices.filter((i) => i.status === "pending").length,
    paid: invoices.filter((i) => i.status === "paid").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Sent</span>;
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Pending</span>;
      case "paid":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Paid</span>;
      case "overdue":
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Overdue</span>;
      default:
        return null;
    }
  };

  const handleSendEmail = (invoice: Invoice) => {
    console.log(`Sending invoice ${invoice.invoiceId} to ${invoice.studentName}`);
    // In a real app, this would trigger email sending
  };

  const handleDelete = (invoiceId: number) => {
    setInvoices((prev) => prev.filter((i) => i.id !== invoiceId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Invoice Management</h2>
          <p className="text-sm text-gray-600">Generate and manage billing invoices</p>
        </div>
        <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold flex items-center gap-2">
          <Plus size={18} />
          New Invoice
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Total</div>
          <div className="mt-1 text-2xl font-bold text-gray-800">{stats.total}</div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Sent</div>
          <div className="mt-1 text-2xl font-bold text-blue-600">{stats.sent}</div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Pending</div>
          <div className="mt-1 text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Paid</div>
          <div className="mt-1 text-2xl font-bold text-green-600">{stats.paid}</div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">Overdue</div>
          <div className="mt-1 text-2xl font-bold text-red-600">{stats.overdue}</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  selectedTab === "all"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab("sent")}
                className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  selectedTab === "sent"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sent ({stats.sent})
              </button>
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  selectedTab === "pending"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setSelectedTab("overdue")}
                className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  selectedTab === "overdue"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Overdue ({stats.overdue})
              </button>
            </div>

            <div className="w-full sm:w-64 relative">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-800">{invoice.invoiceId}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <div>{invoice.studentName}</div>
                    <div className="text-xs text-gray-500">{invoice.studentId}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.issueDate}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowPreview(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleSendEmail(invoice)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                        title="Send Email"
                      >
                        <Mail size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(invoice.id)}
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
      </div>

      {/* Invoice Preview Modal */}
      {showPreview && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-[#800000]">Invoice Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-6 bg-gray-50">
              {/* Header */}
              <div className="border-b-2 border-[#800000] pb-4">
                <h3 className="text-2xl font-bold text-[#800000]">INVOICE</h3>
                <p className="text-sm text-gray-600 mt-1">School Enterprise Management Information System</p>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold">Invoice Number:</p>
                  <p className="text-gray-800">{selectedInvoice.invoiceId}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Issue Date:</p>
                  <p className="text-gray-800">{selectedInvoice.issueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Due Date:</p>
                  <p className="text-gray-800">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Status:</p>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
              </div>

              {/* Bill To */}
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Bill To</h4>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold">{selectedInvoice.studentName}</p>
                  <p>{selectedInvoice.studentId}</p>
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-[#800000] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-300">
                      <td className="px-4 py-2">{selectedInvoice.description}</td>
                      <td className="px-4 py-2 text-right font-semibold">${selectedInvoice.amount.toLocaleString()}</td>
                    </tr>
                    <tr className="border-t border-gray-300 bg-gray-100">
                      <td className="px-4 py-2 font-semibold">Total Amount Due</td>
                      <td className="px-4 py-2 text-right font-bold text-lg">${selectedInvoice.amount.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="border-t pt-4 text-xs text-gray-600">
                <p className="font-semibold mb-1">Payment Instructions:</p>
                <p>Please make payment by the due date. Payments can be made via online portal, bank transfer, or check.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => handleSendEmail(selectedInvoice)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
              >
                <Send size={16} />
                Send Email
              </button>
              <button
                onClick={() => setShowPreview(false)}
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

export default BillingInvoices;
