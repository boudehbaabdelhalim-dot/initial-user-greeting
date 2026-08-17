import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { SIMULATION_SCENARIOS } from "../data/mockData";

type SimType = "pricing" | "inventory" | "expansion" | "promotion" | "hiring";

interface SimResult {
  revenueChange: number;
  profitChange: number;
  costChange: number;
  risk: string;
  confidence: number;
  recommendation: string;
}

const SIM_TYPES: { id: SimType; label: string; icon: string; desc: string }[] = [
  { id: "pricing", label: "Price Change", icon: "💰", desc: "Simulate price adjustment impact" },
  { id: "inventory", label: "Order Quantity", icon: "📦", desc: "Simulate bulk purchase scenarios" },
  { id: "expansion", label: "New Branch", icon: "🏪", desc: "Simulate opening new location" },
  { id: "promotion", label: "Promotion", icon: "📣", desc: "Simulate campaign outcomes" },
  { id: "hiring", label: "Hiring", icon: "👤", desc: "Simulate headcount change" },
];

export default function SimulationLab() {
  const [activeScenario, setActiveScenario] = useState<SimType>("pricing");
  const [priceChange, setPriceChange] = useState(5);
  const [productName, setProductName] = useState("Extra Virgin Olive Oil");
  const [simRun, setSimRun] = useState(false);
  const [loading, setLoading] = useState(false);

  const runSimulation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSimRun(true);
    }, 1800);
  };

  const simResult: SimResult = {
    revenueChange: priceChange > 0 ? priceChange * 0.6 : priceChange * 1.1,
    profitChange: priceChange > 0 ? priceChange * 3.2 : priceChange * 0.8,
    costChange: 0,
    risk: Math.abs(priceChange) > 10 ? "medium" : "low",
    confidence: Math.max(60, 90 - Math.abs(priceChange) * 2),
    recommendation:
      priceChange > 0 && priceChange <= 8
        ? "Market supports this increase. Demand impact minimal."
        : priceChange > 8
        ? "Aggressive increase — monitor demand closely."
        : "Price reduction may attract volume but reduce margin.",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-900/30 to-indigo-900/30 border border-violet-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <FlaskConical size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Business Simulation Lab</div>
            <div className="text-violet-300 text-xs">Test decisions safely before executing — no real impact</div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2.5 mt-2">
          <div className="text-yellow-400 text-xs font-semibold">⚠️ Simulation Mode</div>
          <div className="text-gray-400 text-xs">Results are predictions based on historical data. Actual results may vary. No real changes are made until you explicitly approve.</div>
        </div>
      </div>

      {/* Pre-built Scenarios */}
      <Card>
        <SectionHeader title="Pre-Built Scenarios" subtitle="AI-generated scenarios based on your business data" />
        <div className="space-y-3">
          {SIMULATION_SCENARIOS.map((scenario) => (
            <div key={scenario.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-white font-semibold text-sm">{scenario.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={scenario.risk === "low" ? "success" : scenario.risk === "medium" ? "warning" : "danger"}>
                      {scenario.risk.toUpperCase()} RISK
                    </Badge>
                    <span className="text-blue-400 text-[10px]">{scenario.confidence}% confidence</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold hover:bg-violet-700 flex-shrink-0">
                  Run Simulation
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-900 rounded-lg p-2.5">
                  <div className="text-gray-500 text-[10px] uppercase mb-2">Current State</div>
                  {Object.entries(scenario.currentState).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-gray-400 capitalize">{k}</span>
                      <span className="text-gray-200">{typeof v === "number" && v > 999 ? `AED ${v.toLocaleString()}` : v}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-violet-900/20 border border-violet-500/20 rounded-lg p-2.5">
                  <div className="text-violet-400 text-[10px] uppercase mb-2">Simulated State</div>
                  {Object.entries(scenario.simulatedState).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-gray-400 capitalize">{k}</span>
                      <span className="text-violet-200">{typeof v === "number" && v > 999 ? `AED ${v.toLocaleString()}` : v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className={`text-sm font-bold ${scenario.revenueChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {scenario.revenueChange > 0 ? "+" : ""}{scenario.revenueChange}%
                  </div>
                  <div className="text-gray-500 text-[10px]">Revenue</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className={`text-sm font-bold ${scenario.profitChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {scenario.profitChange > 0 ? "+" : ""}{scenario.profitChange}%
                  </div>
                  <div className="text-gray-500 text-[10px]">Profit</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className={`text-sm font-bold ${scenario.costChange > 0 ? "text-red-400" : "text-green-400"}`}>
                    {scenario.costChange > 0 ? "+" : ""}AED {Math.abs(scenario.costChange).toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-[10px]">Cost Impact</div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-2">
                <div className="text-blue-400 text-[10px] font-semibold">AI RECOMMENDATION</div>
                <div className="text-gray-300 text-xs">{scenario.recommendation}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Simulation Builder */}
      <Card>
        <SectionHeader title="Custom Simulation Builder" subtitle="Build your own what-if scenario" />

        {/* Simulation Type */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
          {SIM_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => { setActiveScenario(type.id); setSimRun(false); }}
              className={`p-2.5 rounded-lg border text-center transition-all ${activeScenario === type.id ? "border-violet-500/50 bg-violet-500/10" : "border-gray-700 bg-gray-800/50 hover:border-gray-600"}`}
            >
              <div className="text-xl mb-1">{type.icon}</div>
              <div className="text-gray-300 text-xs font-medium">{type.label}</div>
            </button>
          ))}
        </div>

        {/* Parameters */}
        {activeScenario === "pricing" && (
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Product</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 outline-none"
              >
                <option>Extra Virgin Olive Oil</option>
                <option>Organic Full Cream Milk 1L</option>
                <option>Premium Basmati Rice 5kg</option>
                <option>Greek Yogurt 500g</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">
                Price Change: <span className={`font-bold ${priceChange > 0 ? "text-green-400" : "text-red-400"}`}>{priceChange > 0 ? "+" : ""}{priceChange}%</span>
              </label>
              <input
                type="range"
                min={-30}
                max={30}
                value={priceChange}
                onChange={(e) => { setPriceChange(Number(e.target.value)); setSimRun(false); }}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>-30%</span>
                <span>0%</span>
                <span>+30%</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={runSimulation}
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg text-sm hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
        >
          {loading ? "🔄 Running Simulation..." : "▶ Run Simulation"}
        </button>

        {/* Results */}
        {simRun && !loading && (
          <div className="mt-4 space-y-3">
            <div className="border-t border-gray-800 pt-4">
              <div className="text-white font-semibold text-sm mb-3">Simulation Results</div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className={`rounded-xl p-3 border ${simResult.revenueChange > 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                  <div className="text-gray-400 text-[10px] uppercase mb-1">Revenue Impact</div>
                  <div className={`text-2xl font-bold ${simResult.revenueChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {simResult.revenueChange > 0 ? "+" : ""}{simResult.revenueChange.toFixed(1)}%
                  </div>
                </div>
                <div className={`rounded-xl p-3 border ${simResult.profitChange > 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                  <div className="text-gray-400 text-[10px] uppercase mb-1">Profit Impact</div>
                  <div className={`text-2xl font-bold ${simResult.profitChange > 0 ? "text-green-400" : "text-red-400"}`}>
                    {simResult.profitChange > 0 ? "+" : ""}{simResult.profitChange.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">AI Confidence</span>
                  <span className="text-blue-400 text-xs font-bold">{simResult.confidence.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${simResult.confidence}%` }} />
                </div>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 mb-3">
                <div className="text-blue-400 text-[10px] font-semibold mb-1">RECOMMENDATION</div>
                <div className="text-gray-300 text-sm">{simResult.recommendation}</div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
                  Send to Decision Center
                </button>
                <button
                  onClick={() => setSimRun(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
