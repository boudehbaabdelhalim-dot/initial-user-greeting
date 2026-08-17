import { useState } from "react";
import { AlertTriangle, TrendingDown, Search, ArrowRight } from "lucide-react";
import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { PRODUCTS } from "../data/mockData";

const STATUS_CONFIG: Record<string, { label: string; variant: "success" | "warning" | "danger" | "info" | "default" | "purple"; dot: string }> = {
  healthy: { label: "Healthy", variant: "success", dot: "bg-green-500" },
  low_stock: { label: "Low Stock", variant: "warning", dot: "bg-yellow-500" },
  critical: { label: "Critical", variant: "danger", dot: "bg-red-500" },
  dead_stock: { label: "Dead Stock", variant: "default", dot: "bg-gray-500" },
};

const EXPIRY_CONFIG: Record<string, { label: string; color: string }> = {
  none: { label: "No Risk", color: "text-gray-500" },
  low: { label: "Low Risk", color: "text-green-400" },
  medium: { label: "Medium Risk", color: "text-yellow-400" },
  high: { label: "High Risk", color: "text-red-400" },
};

export default function InventoryIntelligence() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: PRODUCTS.length,
    healthy: PRODUCTS.filter(p => p.status === "healthy").length,
    lowStock: PRODUCTS.filter(p => p.status === "low_stock").length,
    critical: PRODUCTS.filter(p => p.status === "critical").length,
    deadStock: PRODUCTS.filter(p => p.status === "dead_stock").length,
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total SKUs", value: stats.total, color: "text-white" },
          { label: "Healthy", value: stats.healthy, color: "text-green-400" },
          { label: "Low Stock", value: stats.lowStock, color: "text-yellow-400" },
          { label: "Critical", value: stats.critical, color: "text-red-400" },
          { label: "Dead Stock", value: stats.deadStock, color: "text-gray-400" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
          <Search size={14} className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent text-gray-300 text-sm outline-none flex-1 placeholder:text-gray-600"
          />
        </div>
        <div className="flex gap-1">
          {["all", "healthy", "low_stock", "critical", "dead_stock"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
        <button
          onClick={() => setView(view === "grid" ? "table" : "grid")}
          className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs hover:bg-gray-700"
        >
          {view === "grid" ? "Table View" : "Grid View"}
        </button>
      </div>

      {/* Product Grid */}
      <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
        {filtered.map((product) => {
          const statusCfg = STATUS_CONFIG[product.status];
          const expiryCfg = EXPIRY_CONFIG[product.expiryRisk];
          const stockPct = Math.min((product.stock / product.maxStock) * 100, 100);
          const healthColor = product.healthScore >= 80 ? "text-green-400" : product.healthScore >= 50 ? "text-yellow-400" : "text-red-400";
          const healthBg = product.healthScore >= 80 ? "bg-green-500" : product.healthScore >= 50 ? "bg-yellow-500" : "bg-red-500";

          if (view === "table") {
            return (
              <div key={product.id} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 hover:border-gray-700">
                <span className="text-xl">{product.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-200 text-sm font-medium truncate">{product.name}</div>
                  <div className="text-gray-500 text-xs">{product.sku}</div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-semibold">AED {product.price}</div>
                  <div className="text-gray-500 text-xs">{product.margin}% margin</div>
                </div>
                <div className="text-right w-20">
                  <div className="text-white text-sm font-semibold">{product.stock}</div>
                  <div className="text-gray-500 text-xs">in stock</div>
                </div>
                <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                <div className={`text-sm font-bold ${healthColor}`}>{product.healthScore}</div>
              </div>
            );
          }

          return (
            <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{product.image}</span>
                  <div>
                    <div className="text-gray-200 text-sm font-semibold leading-tight">{product.name}</div>
                    <div className="text-gray-500 text-[10px]">{product.sku} · {product.brand}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${healthColor}`}>{product.healthScore}</div>
                  <div className="text-gray-600 text-[9px]">HEALTH</div>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Stock: <span className="text-white font-semibold">{product.stock}</span></span>
                  <span className="text-gray-400">Max: {product.maxStock}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${healthBg}`}
                    style={{ width: `${stockPct}%` }}
                  />
                </div>
                <div className="text-gray-600 text-[10px] mt-0.5">Min stock: {product.minStock} units</div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className="text-white text-sm font-bold">AED {product.price}</div>
                  <div className="text-gray-500 text-[10px]">Price</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className="text-green-400 text-sm font-bold">{product.margin}%</div>
                  <div className="text-gray-500 text-[10px]">Margin</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className="text-blue-400 text-sm font-bold">{product.dailySales}/day</div>
                  <div className="text-gray-500 text-[10px]">Velocity</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                  <span className={`text-[10px] ${expiryCfg.color}`}>{expiryCfg.label}</span>
                </div>
                <div className="text-gray-500 text-[10px]">Last sold: {product.lastSold}</div>
              </div>

              {/* Warnings */}
              {(product.status === "critical" || product.status === "low_stock") && (
                <div className="mt-2 flex items-center gap-1.5 text-yellow-400 text-xs bg-yellow-500/10 rounded-lg px-2 py-1.5">
                  <AlertTriangle size={11} />
                  <span>Stock will deplete in {Math.ceil(product.stock / product.dailySales)} days</span>
                </div>
              )}
              {product.status === "dead_stock" && (
                <div className="mt-2 flex items-center gap-1.5 text-gray-400 text-xs bg-gray-800 rounded-lg px-2 py-1.5">
                  <TrendingDown size={11} />
                  <span>Recovery action recommended</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Smart Purchase Recommendations */}
      <Card>
        <SectionHeader
          title="Smart Purchase Engine"
          subtitle="AI-calculated order recommendations"
          action={<Badge variant="info">3 recommended</Badge>}
        />
        <div className="space-y-3">
          {PRODUCTS.filter(p => p.status === "critical" || p.status === "low_stock").map((p) => {
            const daysLeft = Math.ceil(p.stock / p.dailySales);
            const suggestedOrder = Math.ceil((p.maxStock - p.stock) * 0.8);
            const orderCost = suggestedOrder * p.cost;
            return (
              <div key={p.id} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <span className="text-xl">{p.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-200 text-sm font-medium">{p.name}</div>
                  <div className="text-gray-500 text-xs">
                    {p.stock} units left · {daysLeft} days until stockout · Lead time: {
                      daysLeft < 3 ? <span className="text-red-400 font-semibold">URGENT</span> : "4 days"
                    }
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-white text-sm font-bold">Order {suggestedOrder} units</div>
                  <div className="text-gray-400 text-xs">≈ AED {orderCost.toFixed(0)}</div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex-shrink-0">
                  <ArrowRight size={12} />
                  Create PO
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
