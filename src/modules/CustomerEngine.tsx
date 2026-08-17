import { useState } from "react";
import { Users, Gift, MessageSquare } from "lucide-react";
import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { CUSTOMERS } from "../data/mockData";

const TIER_CONFIG: Record<string, { color: string; bg: string }> = {
  Platinum: { color: "text-violet-400", bg: "bg-violet-500/20" },
  Gold: { color: "text-yellow-400", bg: "bg-yellow-500/20" },
  Silver: { color: "text-gray-300", bg: "bg-gray-500/20" },
  Bronze: { color: "text-orange-400", bg: "bg-orange-700/20" },
};

const CHURN_CONFIG: Record<string, { label: string; variant: "danger" | "warning" | "success"; action: string }> = {
  high: { label: "HIGH RISK", variant: "danger", action: "Send Emergency Offer" },
  medium: { label: "MEDIUM RISK", variant: "warning", action: "Send Reminder" },
  low: { label: "HEALTHY", variant: "success", action: "Loyalty Reward" },
};

export default function CustomerEngine() {
  const [activeTab, setActiveTab] = useState<"overview" | "churn" | "ltv" | "segments">("overview");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CUSTOMERS[0] | null>(null);

  const churnRisk = CUSTOMERS.filter(c => c.churnRisk === "high" || c.churnRisk === "medium").length;
  const avgLTV = Math.round(CUSTOMERS.reduce((a, c) => a + c.ltv, 0) / CUSTOMERS.length);
  const totalLTV = CUSTOMERS.reduce((a, c) => a + c.ltv, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Customer Value Engine</div>
            <div className="text-blue-300 text-xs">Lifetime value · Churn prediction · Personalization</div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-black/20 rounded-lg p-2.5 text-center">
            <div className="text-2xl font-bold text-white">{CUSTOMERS.length}</div>
            <div className="text-gray-400 text-xs">Total Customers</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2.5 text-center">
            <div className="text-2xl font-bold text-green-400">AED {avgLTV.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">Avg Lifetime Value</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2.5 text-center">
            <div className="text-2xl font-bold text-red-400">{churnRisk}</div>
            <div className="text-gray-400 text-xs">Churn Risk</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2.5 text-center">
            <div className="text-2xl font-bold text-violet-400">AED {totalLTV.toLocaleString()}</div>
            <div className="text-gray-400 text-xs">Total Customer Value</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-800">
        {(["overview", "churn", "ltv", "segments"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
          >
            {tab === "ltv" ? "Lifetime Value" : tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-3">
          {CUSTOMERS.map((customer) => {
            const tier = TIER_CONFIG[customer.loyaltyTier];
            const churn = CHURN_CONFIG[customer.churnRisk];
            const isSelected = selectedCustomer?.id === customer.id;

            return (
              <div
                key={customer.id}
                className={`bg-gray-900 border rounded-xl p-4 cursor-pointer transition-all ${isSelected ? "border-blue-500/50" : "border-gray-800 hover:border-gray-700"}`}
                onClick={() => setSelectedCustomer(isSelected ? null : customer)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm">{customer.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tier.bg} ${tier.color}`}>
                        {customer.loyaltyTier}
                      </span>
                      <Badge variant={churn.variant}>{churn.label}</Badge>
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">{customer.email} · Last visit: {customer.lastVisit}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-white font-bold text-sm">AED {customer.ltv.toLocaleString()}</div>
                    <div className="text-gray-500 text-xs">Lifetime Value</div>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="bg-gray-800 rounded-lg p-2 text-center">
                        <div className="text-white text-sm font-bold">{customer.orders}</div>
                        <div className="text-gray-500 text-xs">Total Orders</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-2 text-center">
                        <div className="text-green-400 text-sm font-bold">AED {customer.avgOrder}</div>
                        <div className="text-gray-500 text-xs">Avg Order</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-2 text-center">
                        <div className="text-violet-400 text-sm font-bold">{customer.points}</div>
                        <div className="text-gray-500 text-xs">Loyalty Points</div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2.5 mb-3">
                      <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">AI — Next Best Action</div>
                      {customer.churnRisk === "high" && (
                        <div className="text-orange-300 text-xs">⚡ Customer inactive {customer.daysSinceLastVisit} days. Send personalized win-back offer with 15% discount on favorite category.</div>
                      )}
                      {customer.churnRisk === "medium" && (
                        <div className="text-yellow-300 text-xs">📬 Customer cooling off. Trigger reminder with loyalty points update and product recommendation.</div>
                      )}
                      {customer.churnRisk === "low" && (
                        <div className="text-green-300 text-xs">🌟 Active and healthy. Surprise with loyalty reward to deepen relationship and increase basket size.</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700">
                        <MessageSquare size={11} />
                        {churn.action}
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/20 text-violet-400 rounded-lg text-xs">
                        <Gift size={11} />
                        Send Reward
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "churn" && (
        <div className="space-y-4">
          <Card>
            <SectionHeader title="Churn Risk Analysis" subtitle="Customers showing disengagement signals" />
            <div className="space-y-3">
              {CUSTOMERS.filter(c => c.churnRisk !== "low").map(c => (
                <div key={c.id} className={`p-3 rounded-xl border ${c.churnRisk === "high" ? "bg-red-500/10 border-red-500/20" : "bg-yellow-500/10 border-yellow-500/20"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-white text-sm font-semibold">{c.name}</div>
                      <div className="text-gray-400 text-xs">Inactive for {c.daysSinceLastVisit} days · AED {c.ltv.toLocaleString()} LTV at risk</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={c.churnRisk === "high" ? "danger" : "warning"}>
                        {c.churnRisk === "high" ? "HIGH RISK" : "MEDIUM RISK"}
                      </Badge>
                      <button className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-gray-100">
                        Act Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SectionHeader title="Churn Prevention Playbook" subtitle="AI-recommended actions" />
            <div className="space-y-2">
              {[
                { trigger: "Inactive 14+ days", action: "Send personalized product recommendation", impact: "40% re-engagement rate" },
                { trigger: "Inactive 30+ days", action: "Send win-back offer with 15% discount", impact: "25% recovery rate" },
                { trigger: "Inactive 60+ days", action: "Final loyalty bonus offer", impact: "12% last-chance save" },
                { trigger: "3+ consecutive no-purchase", action: "Survey — what changed?", impact: "Insight collection" },
              ].map((play, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-yellow-400 text-xs font-semibold">TRIGGER: {play.trigger}</div>
                    <div className="text-gray-300 text-xs">→ {play.action}</div>
                    <div className="text-green-400 text-[10px]">Expected: {play.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "ltv" && (
        <div className="space-y-4">
          <Card>
            <SectionHeader title="Customer Lifetime Value Ranking" subtitle="Sorted by total value contributed" />
            <div className="space-y-2">
              {[...CUSTOMERS].sort((a, b) => b.ltv - a.ltv).map((c, i) => {
                const pct = (c.ltv / CUSTOMERS[3].ltv) * 100;
                const tier = TIER_CONFIG[c.loyaltyTier];
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="text-gray-500 text-xs w-4">{i + 1}</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-200 text-sm">{c.name}</span>
                        <span className={`text-xs font-bold ${tier.color}`}>AED {c.ltv.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "segments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { segment: "VIP", color: "text-violet-400 border-violet-500/30 bg-violet-500/10", count: 2, desc: "High LTV, high frequency, low churn", action: "Exclusive perks program" },
            { segment: "Regular", color: "text-blue-400 border-blue-500/30 bg-blue-500/10", count: 1, desc: "Consistent buyers, moderate LTV", action: "Upsell to VIP" },
            { segment: "At Risk", color: "text-red-400 border-red-500/30 bg-red-500/10", count: 1, desc: "Declining activity, churn predicted", action: "Win-back campaign" },
            { segment: "Occasional", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10", count: 1, desc: "Infrequent but high-value orders", action: "Frequency incentive" },
          ].map((seg) => (
            <div key={seg.segment} className={`rounded-xl border p-4 ${seg.color}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold">{seg.segment}</div>
                <div className="text-2xl font-bold">{seg.count}</div>
              </div>
              <div className="text-gray-300 text-xs mb-3">{seg.desc}</div>
              <div className="text-[10px] opacity-70">Recommended: {seg.action}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
