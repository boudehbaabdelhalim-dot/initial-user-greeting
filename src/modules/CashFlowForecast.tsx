import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";
import { DollarSign } from "lucide-react";
import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { CASH_FLOW_FORECAST, KPI_DATA } from "../data/mockData";

export default function CashFlowForecast() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
            <DollarSign size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Cash Flow Intelligence</div>
            <div className="text-emerald-300 text-xs">7/30/90-day forecasting · Risk detection · Supplier payment planning</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black/20 rounded-lg p-2.5 text-center">
            <div className="text-white text-xl font-bold">AED {KPI_DATA.cashFlow7Day.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">7-Day Forecast</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2.5 text-center">
            <div className="text-green-400 text-xl font-bold">AED 74,200</div>
            <div className="text-gray-400 text-xs">30-Day Balance</div>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2.5 text-center">
            <div className="text-yellow-400 text-xl font-bold">Day 12</div>
            <div className="text-gray-400 text-xs">⚠️ Cash Dip Alert</div>
          </div>
        </div>
      </div>

      <Card>
        <SectionHeader title="30-Day Cash Flow Forecast" subtitle="AI-projected cash position" />
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={CASH_FLOW_FORECAST}>
            <defs>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
            <Area type="monotone" dataKey="balance" stroke="#10b981" fill="url(#balGrad)" strokeWidth={2} name="Cash Balance" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Cash In vs Cash Out" subtitle="Daily projected flows" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CASH_FLOW_FORECAST.slice(0, 7)} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
              <Bar dataKey="cashIn" fill="#22c55e" radius={[3, 3, 0, 0]} name="Cash In" />
              <Bar dataKey="cashOut" fill="#ef4444" radius={[3, 3, 0, 0]} name="Cash Out" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Upcoming Payments" subtitle="AI-planned outflows" />
          <div className="space-y-2">
            {[
              { name: "Al Rawabi Dairy", amount: 18400, due: "Day 5", type: "supplier", risk: "planned" },
              { name: "Gulf Food Trading", amount: 12800, due: "Day 8", type: "supplier", risk: "planned" },
              { name: "Rent — Main Branch", amount: 24000, due: "Day 10", type: "fixed", risk: "critical" },
              { name: "Mediterranean Foods", amount: 8200, due: "Day 18", type: "supplier", risk: "planned" },
              { name: "Utilities", amount: 3200, due: "Day 30", type: "fixed", risk: "planned" },
            ].map((payment, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-800/50 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${payment.risk === "critical" ? "bg-red-500/20" : "bg-blue-500/20"}`}>
                  {payment.type === "supplier" ? "🚚" : "🏢"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-200 text-xs font-medium truncate">{payment.name}</div>
                  <div className="text-gray-500 text-[10px]">Due: {payment.due}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-sm font-bold ${payment.risk === "critical" ? "text-red-400" : "text-white"}`}>
                    AED {payment.amount.toLocaleString()}
                  </div>
                  <Badge variant={payment.risk === "critical" ? "warning" : "info"}>
                    {payment.risk === "critical" ? "large" : "planned"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="AI Cash Flow Insight" />
        <div className="space-y-3">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="text-yellow-400 text-xs font-semibold">⚠️ Day 12 Cash Dip Predicted</div>
            <div className="text-gray-300 text-sm mt-1">Rent payment of AED 24,000 coincides with a historically lower-revenue period. Cash balance may drop to AED 8,200 — below the AED 15,000 safe threshold.</div>
            <div className="text-gray-400 text-xs mt-2">Recommendation: Collect outstanding receivables by Day 10. Consider requesting Net 45 from Mediterranean Foods for the next order.</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-green-400 text-xs font-semibold">✅ 90-Day Outlook Positive</div>
            <div className="text-gray-300 text-sm mt-1">Projected 90-day cash position: AED 142,000. Revenue growth trend of +8.3% month-over-month indicates healthy cash generation capability.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
