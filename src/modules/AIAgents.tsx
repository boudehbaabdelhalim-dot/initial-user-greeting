import { Zap, ArrowDown } from "lucide-react";
import { Card, SectionHeader } from "../components/ui/Card";
import { AI_AGENTS } from "../data/mockData";

export default function AIAgents() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">AI Executive Team</div>
            <div className="text-yellow-300 text-xs">9 specialized agents · Orchestrated · Cross-validated · Human-approved</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-white text-2xl font-bold">9</div>
            <div className="text-gray-400 text-xs">Active Agents</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-green-400 text-2xl font-bold">135</div>
            <div className="text-gray-400 text-xs">Actions Today</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <div className="text-blue-400 text-2xl font-bold">94%</div>
            <div className="text-gray-400 text-xs">Avg Confidence</div>
          </div>
        </div>
      </div>

      {/* Orchestration Flow */}
      <Card>
        <SectionHeader title="AI Orchestration Flow" subtitle="How agents collaborate to produce recommendations" />
        <div className="flex flex-col items-center gap-1">
          {[
            { label: "AI ORCHESTRATOR", color: "bg-yellow-600", desc: "Receives task — routes to best agent" },
            { label: "SPECIALIZED AGENTS", color: "bg-blue-600", desc: "Each agent analyzes its domain" },
            { label: "CROSS-CHECK", color: "bg-violet-600", desc: "Agents validate each other's findings" },
            { label: "VALIDATION", color: "bg-green-600", desc: "Confidence scoring + evidence check" },
            { label: "FINAL RECOMMENDATION", color: "bg-emerald-600", desc: "Explainable output with confidence" },
            { label: "HUMAN APPROVAL", color: "bg-orange-600", desc: "You decide — AI never acts alone on sensitive actions" },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-col items-center w-full max-w-md">
              <div className={`w-full ${step.color} rounded-lg px-4 py-2.5 text-center`}>
                <div className="text-white font-bold text-xs">{step.label}</div>
                <div className="text-white/70 text-[10px]">{step.desc}</div>
              </div>
              {i < 5 && <ArrowDown size={14} className="text-gray-600 my-0.5" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AI_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{agent.icon}</span>
                <div>
                  <div className="text-white font-bold text-sm">{agent.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === "active" ? "bg-green-500" : "bg-gray-500"}`} />
                    <span className="text-gray-500 text-[10px] capitalize">{agent.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 text-sm font-bold">{agent.confidence}%</div>
                <div className="text-gray-600 text-[10px]">trust</div>
              </div>
            </div>

            <div className="text-gray-400 text-xs mb-3">{agent.role}</div>

            <div className="bg-gray-800 rounded-lg p-2.5 mb-3">
              <div className="text-gray-500 text-[10px] uppercase mb-1">Last Action</div>
              <div className="text-gray-200 text-xs">{agent.lastAction}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-xs">
                <span className="text-white font-semibold">{agent.actionsToday}</span> actions today
              </div>
              <div className="flex items-center gap-1">
                <div className="w-16 bg-gray-800 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${agent.confidence}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Safety */}
      <Card>
        <SectionHeader title="AI Safety Constraints" subtitle="What agents can and cannot do independently" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-green-400 text-xs font-semibold mb-2">✅ AGENTS CAN DO AUTONOMOUSLY</div>
            <div className="space-y-1.5">
              {[
                "Analyze data and identify patterns",
                "Generate recommendations with evidence",
                "Detect anomalies and raise alerts",
                "Update dashboards and reports",
                "Classify risk levels",
                "Simulate scenarios",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-red-400 text-xs font-semibold mb-2">🔐 REQUIRES HUMAN APPROVAL</div>
            <div className="space-y-1.5">
              {[
                "Execute price changes",
                "Place purchase orders",
                "Issue refunds or credits",
                "Delete or modify customer data",
                "Activate promotions",
                "Select or switch suppliers",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* AI Action Log */}
      <Card>
        <SectionHeader title="AI Action Log" subtitle="Recent agent activity trail" />
        <div className="space-y-2">
          {[
            { time: "09:42", agent: "INVENTORY AGENT", action: "Stock alert raised: Basmati Rice at 1.5-day depletion", type: "alert" },
            { time: "09:38", agent: "CFO AGENT", action: "Identified olive oil pricing opportunity — +AED 840/month", type: "opportunity" },
            { time: "09:21", agent: "CUSTOMER AGENT", action: "Churn risk flagged: Ahmed Hassan inactive 32 days", type: "alert" },
            { time: "08:55", agent: "CEO AGENT", action: "Generated morning executive brief — 3 priority actions", type: "report" },
            { time: "08:30", agent: "SECURITY AGENT", action: "Daily scan completed — no anomalies detected", type: "clear" },
            { time: "08:00", agent: "ORCHESTRATOR", action: "Daily agent sync completed — all 9 agents active", type: "system" },
          ].map((log, i) => {
            const typeColors: Record<string, string> = {
              alert: "text-red-400",
              opportunity: "text-green-400",
              report: "text-blue-400",
              clear: "text-gray-400",
              system: "text-violet-400",
            };
            return (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-800 last:border-0">
                <div className="text-gray-600 text-[10px] w-10 flex-shrink-0 pt-0.5">{log.time}</div>
                <div className="w-24 text-[10px] text-blue-400 flex-shrink-0">{log.agent}</div>
                <div className={`flex-1 text-xs ${typeColors[log.type]}`}>{log.action}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
