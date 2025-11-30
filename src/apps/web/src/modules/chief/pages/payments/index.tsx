import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Calendar, CheckCircle2, Clock } from "lucide-react";
import { useGetPayments } from "@web/lib/hooks/payment/use-get-payments";
import { PaymentStatus } from "@core/domain/payment";
import Badge from "@web/components/badge";

const PaymentsListScreen = () => {
  const navigate = useNavigate();
  const { payments, isLoading } = useGetPayments();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const filteredPayments = payments.filter((p) =>
    filterStatus === "ALL" ? true : p.status === filterStatus
  );

  const totalPaid = filteredPayments
    .filter((p) => p.status === PaymentStatus.PAID)
    .reduce((acc, p) => acc + (p.paidAmount || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-500">
            Manage monthly settlements with freelancers.
          </p>
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {["ALL", PaymentStatus.PAID, PaymentStatus.PENDING].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {status === "ALL" ? "All" : status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-emerald-600">
            <DollarSign size={24} />
            <h3 className="font-bold text-slate-700">Total Paid (BRL)</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            R$ {totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-blue-600">
            <CheckCircle2 size={24} />
            <h3 className="font-bold text-slate-700">Settled Months</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {payments.filter((p) => p.status === PaymentStatus.PAID).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-amber-500">
            <Clock size={24} />
            <h3 className="font-bold text-slate-700">Pending</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {payments.filter((p) => p.status === PaymentStatus.PENDING).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400">
            Loading payments...
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <DollarSign size={32} />
            </div>
            <p className="text-slate-500">No payments found.</p>
            <p className="text-sm text-slate-400 max-w-md">
              Go to "Projects" or "Dashboard", select a user, and generate a
              monthly payment.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Freelancer</th>
                <th className="px-6 py-4">Original (EUR)</th>
                <th className="px-6 py-4">Rate</th>
                <th className="px-6 py-4">Paid (BRL)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {payment.month.toString().padStart(2, "0")}/{payment.year}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {payment.freelancerId === "u1"
                      ? "Emanuel Vilela"
                      : payment.freelancerId}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    € {payment.originalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    R$ {payment.exchangeRate?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-600">
                    R$ {payment.paidAmount?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      color={
                        payment.status === PaymentStatus.PAID
                          ? "green"
                          : "yellow"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate(`/chief/payments/${payment.freelancerId}`)
                      }
                      className="text-slate-400 hover:text-emerald-600 font-medium transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

PaymentsListScreen.route = "/chief/payments";

export default PaymentsListScreen;
