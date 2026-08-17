import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { SUPPLIERS } from "../data/mockData";

const STATUS_CONFIG: Record<string, { variant: "success" | "info" | "warning" | "danger"; label: string }> = {
  preferred: { variant: "success", label: "Preferred" },
  active: { variant: "info", label: "Active" },
  review: { variant: "warning", label: "Needs Review" },
  inactive: { variant: "danger", label: "Inactive" },
};

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-gray-300 text-xs w-6 text-right">{value}</span>
    </div>
  );
}

export default function SupplierIntelligence() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center text-white text-lg">
            🚚
          </div>
          <div>
            <div className="text-white font-bold">Supplier Negotiation Intelligence</div>
            <div className="text-orange-300 text-xs">Score · Reliability · Total cost analysis · Alternatives</div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-white text-2xl font-bold">{SUPPLIERS.length}</div>
            <div className="text-gray-400 text-xs">Active Suppliers</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-green-400 text-2xl font-bold">AED 226K</div>
            <div className="text-gray-400 text-xs">Total Spend (6mo)</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-yellow-400 text-2xl font-bold">1</div>
            <div className="text-gray-400 text-xs">Needs Review</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-blue-400 text-2xl font-bold">AED 1,240</div>
            <div className="text-gray-400 text-xs">Potential Savings</div>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-3">
        <div className="text-blue-400 text-xs font-semibold mb-1">🤖 AI Supplier Intelligence</div>
        <div className="text-gray-300 text-sm">
          <strong>Supplier B (Mediterranean Foods)</strong> is cheaper by 7.2% after delivery cost compared to your current primary for oils.
          Fresh Produce Hub defect rate (2.1%) exceeds your threshold of 1.5%. Trial recommended.
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SUPPLIERS.map((supplier) => {
          const status = STATUS_CONFIG[supplier.status];
          const overallScore = Math.round(
            (supplier.priceScore * 0.25 + supplier.reliabilityScore * 0.35 + supplier.deliveryScore * 0.25 + (100 - supplier.defectRate * 10) * 0.15)
          );
          const scoreColor = overallScore >= 85 ? "text-green-400" : overallScore >= 70 ? "text-yellow-400" : "text-red-400";

          return (
            <div key={supplier.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-bold">{supplier.name}</div>
                  <div className="text-gray-500 text-xs">{supplier.category} · Last order: {supplier.lastOrder}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <div className={`text-2xl font-bold ${scoreColor}`}>{overallScore}</div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-500">Price Score</span>
                  </div>
                  <ScoreBar value={supplier.priceScore} color="bg-green-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">Reliability</div>
                  <ScoreBar value={supplier.reliabilityScore} color="bg-blue-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">Delivery Score</div>
                  <ScoreBar value={supplier.deliveryScore} color="bg-violet-500" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">Quality ({(100 - supplier.defectRate * 10).toFixed(0)}/100)</div>
                  <ScoreBar value={100 - supplier.defectRate * 10} color="bg-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className="text-white text-sm font-bold">{supplier.leadTime}d</div>
                  <div className="text-gray-500 text-[10px]">Lead Time</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className="text-white text-sm font-bold">{supplier.defectRate}%</div>
                  <div className="text-gray-500 text-[10px]">Defect Rate</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-center">
                  <div className="text-white text-sm font-bold">{supplier.paymentTerms}</div>
                  <div className="text-gray-500 text-[10px]">Payment</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-xs">
                  Total spend: <span className="text-white font-semibold">AED {supplier.totalSpend.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30">
                    View History
                  </button>
                  <button className="px-2.5 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs hover:bg-gray-600">
                    Create PO
                  </button>
                </div>
              </div>

              {supplier.status === "review" && (
                <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-400 text-xs">⚠️ Defect rate above threshold. AI recommends reviewing or trialing alternative supplier.</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Negotiation Intelligence */}
      <Card>
        <SectionHeader title="Negotiation Intelligence" subtitle="AI-calculated leverage points" />
        <div className="space-y-3">
          {[
            {
              supplier: "Al Rawabi Dairy",
              insight: "Prices increased 4% last quarter. Based on 3-year spend of AED 168K, you have negotiation leverage. Request 2% rollback or extended Net 45 terms.",
              potential: "AED 1,680/year",
              confidence: 72,
            },
            {
              supplier: "Gulf Food Trading",
              insight: "Lower price score (74) compared to market. Competitor supplier offers similar products 6.5% cheaper. Use as leverage in next negotiation.",
              potential: "AED 4,040/year",
              confidence: 68,
            },
            {
              supplier: "Fresh Produce Hub",
              insight: "Defect rate 2.1% causing AED 810 in annual waste. Document and present to supplier — request quality SLA or pricing adjustment.",
              potential: "AED 810/year",
              confidence: 81,
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="text-gray-200 text-sm font-semibold">{item.supplier}</div>
                <div>
                  <span className="text-green-400 text-xs font-bold">{item.potential}</span>
                  <span className="text-gray-500 text-[10px] ml-1">potential</span>
                </div>
              </div>
              <div className="text-gray-400 text-xs mb-2">{item.insight}</div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${item.confidence}%` }} />
                </div>
                <span className="text-blue-400 text-[10px]">{item.confidence}% confidence</span>
                <button className="ml-auto px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30">
                  Prepare Negotiation
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
