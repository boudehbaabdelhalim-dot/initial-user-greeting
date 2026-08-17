import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  TrendingUp, DollarSign, Package, Users,
  Brain
} from "lucide-react";
import { Card, StatCard, SectionHeader, Badge } from "../components/ui/Card";
import { useEffect, useState } from "react";
import {
  REVENUE_CHART,
  PROFIT_OPPORTUNITIES,
  BUSINESS_INFO,
  MONTHLY_TREND
} from "../data/mockData";



type DashboardKPIs = {
  todayRevenue: number;
  todayProfit: number;
  todayOrders: number;
  activeCustomers: number;
  lowStockItems: number;
  pendingDecisions: number;
  activeAlerts: number;
  monthlyRevenue: number;
  monthlyProfit: number;
  profitMargin: number;
};

type DashboardResponse = {
  success: boolean;
  data: {
    kpis: DashboardKPIs;
  };
};

type ApiAlert = {
  id: number;
  type: string;
  title: string;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  created_at: string;
};

type AlertsResponse = {
  success: boolean;
  data: ApiAlert[];
};

type ApiDecision = {
  id: number;
  agent: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: string;
  created_at: string;
};

type DecisionsResponse = {
  success: boolean;
  data: ApiDecision[];
};

type InventoryHealthItem = {
  category: string;
  count: number;
  percentage: number;
  color: string;
};

type InventoryHealthResponse = {
  success: boolean;
  data: InventoryHealthItem[];
};

export default function Dashboard() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [alerts, setAlerts] = useState<ApiAlert[]>([]);
  const [decisions, setDecisions] = useState<ApiDecision[]>([]);
  const [inventoryHealth, setInventoryHealth] = useState<InventoryHealthItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topOpportunity = PROFIT_OPPORTUNITIES.reduce(
    (acc, p) => acc + p.monthlyValue,
    0
  );

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          dashboardResponse,
          alertsResponse,
          decisionsResponse,
          inventoryHealthResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/dashboard"),
          fetch("http://localhost:5000/api/alerts"),
          fetch("http://localhost:5000/api/ai-decisions"),
          fetch("http://localhost:5000/api/inventory/health"),
        ]);

        if (!dashboardResponse.ok) {
          throw new Error(`Dashboard API HTTP error: ${dashboardResponse.status}`);
        }

        if (!alertsResponse.ok) {
          throw new Error(`Alerts API HTTP error: ${alertsResponse.status}`);
        }

        if (!decisionsResponse.ok) {
          throw new Error(`AI Decisions API HTTP error: ${decisionsResponse.status}`);
        }

        if (!inventoryHealthResponse.ok) {
          throw new Error(`Inventory Health API HTTP error: ${inventoryHealthResponse.status}`);
        }

        const [
          dashboardResult,
          alertsResult,
          decisionsResult,
          inventoryHealthResult,
        ]: [
          DashboardResponse,
          AlertsResponse,
          DecisionsResponse,
          InventoryHealthResponse
        ] = await Promise.all([
          dashboardResponse.json(),
          alertsResponse.json(),
          decisionsResponse.json(),
          inventoryHealthResponse.json(),
        ]);

        if (!dashboardResult.success) {
          throw new Error("Dashboard API returned an error");
        }

        if (!alertsResult.success) {
          throw new Error("Alerts API returned an error");
        }

        if (!decisionsResult.success) {
          throw new Error("AI Decisions API returned an error");
        }

        if (!inventoryHealthResult.success) {
          throw new Error("Inventory Health API returned an error");
        }

        setKpis(dashboardResult.data.kpis);
        setAlerts(alertsResult.data);
        setDecisions(decisionsResult.data);
        setInventoryHealth(inventoryHealthResult.data);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Unable to load live dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400 text-sm">
          Loading live dashboard data...
        </div>
      </div>
    );
  }

  if (error || !kpis) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-sm">
          {error ?? "No dashboard data available."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Morning Brief Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 to-violet-900/40 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Good morning — AI Executive Brief</div>
              <div className="text-blue-300 text-xs mt-0.5">
                {BUSINESS_INFO.name} · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
          <Badge variant="success">94% AI Trust</Badge>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-black/20 rounded-lg p-2.5">
            <div className="text-gray-400 mb-1">🔴 Critical Actions</div>
            <div className="text-white font-semibold">2 items need immediate attention</div>
            <div className="text-gray-500">Rice stockout in 1.5 days · Coffee expiry risk</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2.5">
            <div className="text-gray-400 mb-1">💡 Today's Opportunity</div>
            <div className="text-white font-semibold">+AED {topOpportunity.toLocaleString()}/month</div>
            <div className="text-gray-500">5 profit opportunities identified</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2.5">
            <div className="text-gray-400 mb-1">✅ Top 3 Actions Today</div>
            <div className="text-white font-semibold text-[11px]">1. Order rice immediately</div>
            <div className="text-white font-semibold text-[11px]">2. Activate coffee recovery promo</div>
            <div className="text-white font-semibold text-[11px]">3. Send offer to Ahmed Hassan</div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Revenue"
          value={`AED ${kpis.todayRevenue.toLocaleString()}`}
          change="8.3%"
          changePositive={true}
          icon={<DollarSign size={16} />}
          subtitle="vs yesterday"
          color="green"
        />
        <StatCard
          title="Today's Profit"
          value={`AED ${kpis.todayProfit.toLocaleString()}`}
          change="27.8%"
          changePositive={true}
          icon={<TrendingUp size={16} />}
          subtitle={`${kpis.profitMargin}% margin`}
          color="blue"
        />
        <StatCard
          title="Orders Today"
          value={kpis.todayOrders}
          change="12%"
          changePositive={true}
          icon={<Package size={16} />}
          subtitle={`${kpis.todayOrders} transactions`}
          color="violet"
        />
        <StatCard
          title="Active Customers"
          value={kpis.activeCustomers.toLocaleString()}
          change="1 at risk"
          changePositive={false}
          icon={<Users size={16} />}
          subtitle="1 churn risk detected"
          color="yellow"
        />
      </div>

      {/* Business Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <SectionHeader title="Business Health" subtitle="Overall system score" />
          <div className="flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="#1f2937" strokeWidth="10" fill="none" />
                <circle
                  cx="60" cy="60" r="50"
                  stroke="url(#scoreGrad)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(BUSINESS_INFO.healthScore / 100) * 314} 314`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{BUSINESS_INFO.healthScore}</span>
                <span className="text-gray-400 text-xs">/100</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Profit", score: 82, color: "bg-blue-500" },
              { label: "Cash Flow", score: 74, color: "bg-green-500" },
              { label: "Inventory", score: 68, color: "bg-yellow-500" },
              { label: "Customers", score: 91, color: "bg-violet-500" },
              { label: "Suppliers", score: 79, color: "bg-orange-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="text-gray-400 text-xs w-20">{item.label}</div>
                <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                  <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.score}%` }} />
                </div>
                <div className="text-gray-300 text-xs w-8 text-right">{item.score}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Chart */}
        <Card className="col-span-2">
          <SectionHeader title="Revenue & Profit — This Week" subtitle="Daily performance breakdown" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_CHART}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#9ca3af" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#profGrad)" strokeWidth={2} name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alerts + Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Smart Alerts */}
        <Card>
          <SectionHeader
            title="Smart Alerts"
            subtitle="AI-prioritized notifications"
            action={
              <span className="text-blue-400 text-xs cursor-pointer hover:text-blue-300">View all</span>
            }
          />
          <div className="space-y-2">
            {alerts.map((alert) => {
              const priorityConfig = {
                critical: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", dot: "bg-red-500" },
                high: { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", dot: "bg-orange-500" },
                medium: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", dot: "bg-yellow-500" },
                low: { color: "text-gray-400", bg: "bg-gray-500/10 border-gray-500/20", dot: "bg-gray-500" },
              };
              const cfg = priorityConfig[alert.severity];

              return (
                <div key={alert.id} className={`flex items-start gap-3 p-2.5 rounded-lg border ${cfg.bg}`}>
                  <div className={`w-2 h-2 rounded-full ${cfg.dot} mt-1.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-200 text-xs font-medium truncate">{alert.title}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5 truncate">{alert.message}</div>
                  </div>
                  <button className={`${cfg.color} text-[10px] font-semibold flex-shrink-0 hover:underline`}>
                    Review
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* AI Decisions Pending */}
        <Card>
          <SectionHeader
            title="Decisions Waiting"
            subtitle="AI recommendations pending approval"
            action={
              <Badge variant="warning">
                {decisions.filter((decision) => decision.status === "pending").length} pending
              </Badge>
            }
          />
          <div className="space-y-2">
            {decisions.slice(0, 4).map((decision) => {
              const icon = decision.agent.includes("CFO")
                ? "💰"
                : decision.agent.includes("Inventory")
                  ? "🛒"
                  : "🤖";

              return (
                <div key={decision.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-200 text-xs font-medium truncate">{decision.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-500 text-[10px]">{decision.agent}</span>
                      <span className="text-green-400 text-[10px] capitalize">{decision.priority} priority</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-semibold hover:bg-green-500/30 transition-colors">
                      ✓
                    </button>
                    <button className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px] font-semibold hover:bg-red-500/30 transition-colors">
                      ✗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Inventory Health + Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Inventory Health Distribution" subtitle="All products by health status" />
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={inventoryHealth} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="count" paddingAngle={2}>
                  {inventoryHealth.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1.5">
              {inventoryHealth.map((item) => (
                <div key={item.category} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-gray-400 text-xs">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-200 text-xs font-semibold">{item.count}</span>
                    <span className="text-gray-600 text-[10px]">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeader title="6-Month Revenue Trend" subtitle="Revenue vs Profit" />
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={MONTHLY_TREND} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", fontSize: "11px" }} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Revenue" />
              <Bar dataKey="profit" fill="#22c55e" radius={[3, 3, 0, 0]} name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}