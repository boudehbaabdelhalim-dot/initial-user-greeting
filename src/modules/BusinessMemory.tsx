import { BookOpen } from "lucide-react";
import { Card, SectionHeader, Badge } from "../components/ui/Card";
import { BUSINESS_MEMORY } from "../data/mockData";

const TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  decision: { icon: "🎯", label: "Decision", color: "bg-blue-500/10 border-blue-500/20" },
  experiment: { icon: "🧪", label: "Experiment", color: "bg-violet-500/10 border-violet-500/20" },
  problem: { icon: "⚠️", label: "Problem", color: "bg-red-500/10 border-red-500/20" },
  promotion: { icon: "📣", label: "Promotion", color: "bg-green-500/10 border-green-500/20" },
};

export default function BusinessMemory() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">Business Memory</div>
            <div className="text-indigo-300 text-xs">Long-term learning — SmartStock remembers what worked and what didn't</div>
          </div>
        </div>
        <div className="text-gray-300 text-sm mt-2">
          The system doesn't just store transactions — it remembers decisions, experiments, problems, and outcomes.
          Over time, it builds a knowledge base specific to your business.
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Memories", value: "247", icon: "🧠" },
          { label: "Decisions Tracked", value: "84", icon: "🎯" },
          { label: "Experiments", value: "32", icon: "🧪" },
          { label: "Success Rate", value: "78%", icon: "✅" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-white text-xl font-bold">{stat.value}</div>
            <div className="text-gray-500 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Memory Timeline */}
      <Card>
        <SectionHeader title="Memory Timeline" subtitle="Decisions and their measured outcomes" />
        <div className="space-y-4">
          {BUSINESS_MEMORY.map((memory) => {
            const type = TYPE_CONFIG[memory.type];
            return (
              <div key={memory.id} className={`border rounded-xl p-4 ${type.color}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{type.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase">{type.label}</span>
                      <span className="text-gray-600 text-[10px]">{memory.date}</span>
                      <Badge variant={memory.result === "positive" ? "success" : "danger"}>
                        {memory.result === "positive" ? "✓ Positive" : "✗ Negative"}
                      </Badge>
                    </div>
                    <div className="text-white font-semibold text-sm mb-1">{memory.title}</div>
                    <div className="text-gray-400 text-xs mb-2">{memory.description}</div>

                    <div className="bg-black/20 rounded-lg p-2.5 mb-2">
                      <div className="text-gray-500 text-[10px] uppercase mb-0.5">Measured Outcome (30 days later)</div>
                      <div className="text-gray-200 text-xs font-medium">{memory.outcome}</div>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-2">
                      <div className="text-blue-400 text-[10px] font-semibold">🤖 AI INSIGHT</div>
                      <div className="text-gray-300 text-xs">{memory.aiInsight}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* What SmartStock Remembers */}
      <Card>
        <SectionHeader title="What SmartStock Remembers" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: "📈", label: "Price Changes & Impact", count: 28 },
            { icon: "📦", label: "Stockouts & Causes", count: 14 },
            { icon: "🎁", label: "Promotions & ROI", count: 19 },
            { icon: "🚚", label: "Supplier Changes", count: 7 },
            { icon: "🌤️", label: "Seasonal Patterns", count: 12 },
            { icon: "⚡", label: "AI Experiments", count: 32 },
          ].map((item) => (
            <div key={item.label} className="bg-gray-800 rounded-xl p-3">
              <div className="text-2xl mb-1.5">{item.icon}</div>
              <div className="text-white text-sm font-semibold">{item.count}</div>
              <div className="text-gray-400 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Feedback Loop */}
      <Card>
        <SectionHeader title="Learning Feedback Loop" subtitle="How SmartStock improves over time" />
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {[
            { icon: "💡", label: "Recommendation" },
            { icon: "✅", label: "User Action" },
            { icon: "📊", label: "Measure Result" },
            { icon: "🧠", label: "Store Memory" },
            { icon: "📈", label: "Improve Model" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-1 flex-shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl">{step.icon}</div>
                <div className="text-gray-400 text-[10px] text-center whitespace-nowrap">{step.label}</div>
              </div>
              {i < 4 && <div className="text-gray-600 mx-1">→</div>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
