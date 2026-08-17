import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Card, SectionHeader } from "../components/ui/Card";
import { REVENUE_CHART, MONTHLY_TREND, INVENTORY_HEALTH } from "../data/mockData";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#6b7280", "#f97316"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Analytics & Natural Language Reports</div>
            <div className="text-blue-300 text-xs">AI-generated insights · Ask anything in plain language</div>
          </div>
        </div>
      </div>

      {/* Natural Language Query */}
      <Card>
        <SectionHeader title="Natural Language Reporting" subtitle="Ask your business anything" />
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              defaultValue="How was the store this month?"
              className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
              Ask AI
            </button>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-blue-400 text-xs font-semibold mb-2">🤖 AI EXECUTIVE REPORT — June 2024</div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="text-green-400 font-semibold">Revenue:</span> AED 312,500 — up 8.3% vs last month. Strong Friday & Saturday performance (+21% weekend uplift).</p>
              <p><span className="text-green-400 font-semibold">Profit:</span> AED 87,400 (28% margin) — improved by reducing dairy procurement cost and bread waste.</p>
              <p><span className="text-yellow-400 font-semibold">Risk:</span> Coffee Beans dead stock (234 units). Basmati Rice critically low. 1 customer churn risk detected.</p>
              <p><span className="text-blue-400 font-semibold">Opportunity:</span> AED 4,070/month in identified improvements. Top action: implement olive oil price increase.</p>
              <p><span className="text-violet-400 font-semibold">Recommendation:</span> Focus this week on stock recovery campaign and reordering Rice before Day 2.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Show top 5 products by margin",
              "Which customers are at churn risk?",
              "What's my best-performing category?",
              "Which supplier should I renegotiate with?",
            ].map((q) => (
              <button key={q} className="px-2.5 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs hover:bg-gray-700 hover:text-gray-300 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Revenue by Day of Week" subtitle="Pattern analysis — 3 months" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={REVENUE_CHART} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Profit Margin Trend" subtitle="6-month progression" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_TREND.map(m => ({ ...m, margin: ((m.profit / m.revenue) * 100).toFixed(1) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[20, 30]} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
              <Line type="monotone" dataKey="margin" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} name="Margin %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <SectionHeader title="Inventory Health" subtitle="By status" />
          <div className="flex justify-center py-2">
            <PieChart width={160} height={160}>
              <Pie data={INVENTORY_HEALTH} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="count" paddingAngle={2}>
                {INVENTORY_HEALTH.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
            </PieChart>
          </div>
          <div className="space-y-1.5">
            {INVENTORY_HEALTH.map((item, i) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-gray-400 text-xs">{item.category}</span>
                </div>
                <span className="text-gray-200 text-xs font-semibold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-2">
          <SectionHeader title="Top Performing Metrics" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Best Day", value: "Saturday", sub: "AED 21,000 avg" },
              { label: "Best Category", value: "Dairy", sub: "38% of revenue" },
              { label: "Highest Margin", value: "Bakery", sub: "45.6% margin" },
              { label: "Fastest Mover", value: "Milk 1L", sub: "34 units/day" },
              { label: "VIP Customers", value: "2", sub: "AED 15.5K avg LTV" },
              { label: "AI Decisions Made", value: "248", sub: "94% accuracy" },
            ].map((metric) => (
              <div key={metric.label} className="bg-gray-800 rounded-xl p-3">
                <div className="text-gray-500 text-[10px] uppercase mb-0.5">{metric.label}</div>
                <div className="text-white font-bold text-sm">{metric.value}</div>
                <div className="text-gray-500 text-[10px]">{metric.sub}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
