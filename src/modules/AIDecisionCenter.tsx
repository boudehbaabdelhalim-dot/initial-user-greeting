import { useState } from "react";
import { Brain, CheckCircle, XCircle, Edit, TrendingUp, ArrowRight } from "lucide-react";
import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { AI_DECISIONS } from "../data/mockData";

type Decision = typeof AI_DECISIONS[0];

const TYPE_CONFIG: Record<string, { icon: string; color: string; bgColor: string }> = {
  purchase: { icon: "🛒", color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20" },
  pricing: { icon: "💰", color: "text-green-400", bgColor: "bg-green-500/10 border-green-500/20" },
  promotion: { icon: "📣", color: "text-violet-400", bgColor: "bg-violet-500/10 border-violet-500/20" },
  transfer: { icon: "🔄", color: "text-orange-400", bgColor: "bg-orange-500/10 border-orange-500/20" },
  supplier: { icon: "🚚", color: "text-yellow-400", bgColor: "bg-yellow-500/10 border-yellow-500/20" },
};

const PRIORITY_CONFIG: Record<string, { label: string; variant: "danger" | "warning" | "info" | "default" }> = {
  critical: { label: "CRITICAL", variant: "danger" },
  high: { label: "HIGH", variant: "warning" },
  medium: { label: "MEDIUM", variant: "info" },
  low: { label: "LOW", variant: "default" },
};

function DecisionCard({ decision, onApprove, onReject }: { decision: Decision; onApprove: (id: string) => void; onReject: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const type = TYPE_CONFIG[decision.type];
  const priority = PRIORITY_CONFIG[decision.priority];

  return (
    <div className={`border rounded-xl p-4 transition-all ${decision.status === "pending" ? `${type.bgColor} hover:opacity-90` : "bg-gray-800/30 border-gray-700/30 opacity-60"}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{type.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={priority.variant}>{priority.label}</Badge>
            <span className="text-gray-500 text-[10px]">{decision.agent}</span>
            <span className="text-gray-600 text-[10px]">· {decision.createdAt}</span>
          </div>
          <div className="text-white font-semibold text-sm mb-1">{decision.title}</div>
          <div className="text-gray-400 text-xs mb-2">{decision.description}</div>

          {/* Recommendation Box */}
          <div className="bg-black/30 rounded-lg p-2.5 mb-3">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">AI Recommendation</div>
            <div className="text-white text-xs font-medium">{decision.recommendation}</div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-1">
                <TrendingUp size={11} className="text-green-400" />
                <span className="text-green-400 text-[10px] font-semibold">{decision.expectedImpact}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-12 bg-gray-700 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${decision.confidence}%` }} />
                </div>
                <span className="text-blue-400 text-[10px]">{decision.confidence}% confidence</span>
              </div>
            </div>
          </div>

          {/* Explainable AI */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-400 text-[10px] hover:text-blue-300 mb-2"
          >
            {expanded ? "▲ Hide reasoning" : "▼ Why this recommendation?"}
          </button>

          {expanded && (
            <div className="bg-gray-900 rounded-lg p-2.5 mb-3 space-y-1">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider">Data Used</div>
              {decision.data.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-gray-300 text-xs">{d}</span>
                </div>
              ))}
              <div className="pt-1 border-t border-gray-700 mt-1">
                <div className="text-gray-500 text-[10px]">Risk Level: <span className={`font-semibold ${decision.risk === "low" ? "text-green-400" : decision.risk === "medium" ? "text-yellow-400" : "text-red-400"}`}>{decision.risk.toUpperCase()}</span></div>
              </div>
            </div>
          )}

          {/* Actions */}
          {decision.status === "pending" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onApprove(decision.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-semibold hover:bg-green-500/30 transition-colors"
              >
                <CheckCircle size={12} />
                Approve & Execute
              </button>
              <button
                onClick={() => onReject(decision.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold hover:bg-red-500/30 transition-colors"
              >
                <XCircle size={12} />
                Reject
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-lg text-xs hover:bg-gray-700 transition-colors">
                <Edit size={12} />
                Modify
              </button>
            </div>
          )}
          {decision.status === "approved" && (
            <div className="flex items-center gap-1.5 text-green-400 text-xs"><CheckCircle size={12} /> Approved & Executed</div>
          )}
          {decision.status === "rejected" && (
            <div className="flex items-center gap-1.5 text-red-400 text-xs"><XCircle size={12} /> Rejected</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIDecisionCenter() {
  const [decisions, setDecisions] = useState(AI_DECISIONS);
  const [filter, setFilter] = useState("all");

  const handleApprove = (id: string) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: "approved" } : d));
  };
  const handleReject = (id: string) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: "rejected" } : d));
  };

  const pending = decisions.filter(d => d.status === "pending");
  const filtered = filter === "all" ? decisions : decisions.filter(d => d.priority === filter || d.type === filter || d.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-900/30 to-blue-900/30 border border-violet-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">AI Decision Center</div>
            <div className="text-violet-300 text-xs">Human-in-the-loop approval workflow</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-white">{pending.length}</div>
            <div className="text-gray-400 text-xs">Pending Approval</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-green-400">{decisions.filter(d => d.status === "approved").length}</div>
            <div className="text-gray-400 text-xs">Approved Today</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-blue-400">AED 4,840</div>
            <div className="text-gray-400 text-xs">Expected Impact</div>
          </div>
        </div>
      </div>

      {/* Approval Workflow Diagram */}
      <Card>
        <SectionHeader title="Approval Workflow" subtitle="Every sensitive decision follows this path" />
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {["REQUEST", "REVIEW", "APPROVE", "EXECUTE", "AUDIT"].map((step, i) => (
            <div key={step} className="flex items-center gap-1 flex-shrink-0">
              <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${i <= 1 ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-gray-800 text-gray-400"}`}>
                {step}
              </div>
              {i < 4 && <ArrowRight size={12} className="text-gray-600" />}
            </div>
          ))}
        </div>
        <div className="text-gray-500 text-xs mt-2">AI recommends → Human reviews → Human approves → System executes → Full audit trail</div>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {["all", "pending", "critical", "high", "purchase", "pricing", "promotion"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Decisions List */}
      <div className="space-y-3">
        {filtered.map((decision) => (
          <DecisionCard
            key={decision.id}
            decision={decision as Decision}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
}
