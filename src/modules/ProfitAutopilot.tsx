import { useState } from "react";
import { TrendingUp, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, SectionHeader } from "../components/ui/Card";
import { PROFIT_OPPORTUNITIES } from "../data/mockData";

const CATEGORY_COLORS: Record<string, string> = {
  "Dead Stock": "text-gray-400 bg-gray-500/10 border-gray-500/20",
  "Pricing": "text-green-400 bg-green-500/10 border-green-500/20",
  "Supplier": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Waste": "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "Bundling": "text-violet-400 bg-violet-500/10 border-violet-500/20",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Dead Stock": "📦",
  "Pricing": "💰",
  "Supplier": "🚚",
  "Waste": "🗑️",
  "Bundling": "🎁",
};

export default function ProfitAutopilot() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const totalPotential = PROFIT_OPPORTUNITIES.reduce((acc, p) => acc + p.monthlyValue, 0);
  const avgConfidence = Math.round(PROFIT_OPPORTUNITIES.reduce((acc, p) => acc + p.confidence, 0) / PROFIT_OPPORTUNITIES.length);

  const active = PROFIT_OPPORTUNITIES.filter(p => !dismissed.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Autopilot Summary */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Profit Autopilot</div>
            <div className="text-green-300 text-xs">AI-discovered profit opportunities — human approval required</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-3xl font-bold text-green-400">AED {totalPotential.toLocaleString()}</div>
            <div className="text-gray-400 text-xs mt-0.5">Potential Monthly Improvement</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-3xl font-bold text-white">{active.length}</div>
            <div className="text-gray-400 text-xs mt-0.5">Opportunities Found</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-3xl font-bold text-blue-400">{avgConfidence}%</div>
            <div className="text-gray-400 text-xs mt-0.5">Avg Confidence</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <Card>
        <SectionHeader title="How Profit Autopilot Works" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { icon: "🔍", label: "Scan", desc: "Analyze all operations" },
            { icon: "🎯", label: "Detect", desc: "Find waste & opportunities" },
            { icon: "🧮", label: "Calculate", desc: "Compute impact & risk" },
            { icon: "📊", label: "Rank", desc: "Prioritize by value" },
            { icon: "🤝", label: "Present", desc: "Show with evidence" },
            { icon: "✅", label: "Approve", desc: "You decide" },
          ].map((step) => (
            <div key={step.label} className="bg-gray-800/50 rounded-lg p-2.5 text-center">
              <div className="text-xl mb-1">{step.icon}</div>
              <div className="text-gray-200 text-xs font-semibold">{step.label}</div>
              <div className="text-gray-500 text-[10px]">{step.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scanning Areas */}
      <Card>
        <SectionHeader title="Areas Scanned" subtitle="What the autopilot analyzed today" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { label: "Pricing", items: 248, issues: 2 },
            { label: "Inventory", items: 248, issues: 3 },
            { label: "Suppliers", items: 4, issues: 1 },
            { label: "Customers", items: 1843, issues: 1 },
            { label: "Waste", items: 89, issues: 1 },
            { label: "Bundles", items: 248, issues: 1 },
          ].map((area) => (
            <div key={area.label} className="bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-green-400 text-xs font-bold">{area.items}</div>
              <div className="text-gray-300 text-[10px]">{area.label}</div>
              <div className="text-orange-400 text-[9px]">{area.issues} found</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Opportunities */}
      <div>
        <SectionHeader
          title="Profit Opportunities"
          subtitle="Ranked by expected monthly value"
          action={<span className="text-gray-400 text-xs">Sorted by impact</span>}
        />
        <div className="space-y-3">
          {active.map((opp, index) => {
            const isExpanded = expandedId === opp.id;
            const colorClass = CATEGORY_COLORS[opp.category] || "text-gray-400 bg-gray-800";
            const icon = CATEGORY_ICONS[opp.category] || "💡";

            return (
              <div key={opp.id} className={`border rounded-xl overflow-hidden transition-all ${colorClass}`}>
                <div
                  className="flex items-start gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : opp.id)}
                >
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <span className="text-xl">{icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-semibold opacity-80">{opp.category}</span>
                    </div>
                    <div className="text-white text-sm font-semibold">{opp.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5 line-clamp-1">{opp.cause}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-white font-bold text-sm">+AED {opp.monthlyValue.toLocaleString()}</div>
                    <div className="text-gray-400 text-[10px]">/month</div>
                    <div className="text-gray-500 text-[10px]">{opp.confidence}% confidence</div>
                  </div>
                  <div className="text-gray-500 flex-shrink-0">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/10 pt-3 bg-black/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Root Cause</div>
                        <div className="text-gray-200 text-xs">{opp.cause}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Recommended Action</div>
                        <div className="text-gray-200 text-xs">{opp.action}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Expected Result</div>
                        <div className="text-gray-200 text-xs">{opp.expectedResult}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="text-gray-500 text-[10px] mb-1">AI Confidence: {opp.confidence}%</div>
                        <div className="w-full bg-black/30 rounded-full h-1.5">
                          <div className="bg-white/60 h-1.5 rounded-full" style={{ width: `${opp.confidence}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors">
                        <CheckCircle size={12} />
                        Implement
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs transition-colors">
                        Send to AI Decision Center
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-xs transition-colors ml-auto"
                        onClick={() => setDismissed(prev => [...prev, opp.id])}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
