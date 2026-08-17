interface Props {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export default function Placeholder({ title, description, icon, features }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
              </div>
              <div className="text-gray-300 text-sm">{feature}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 text-center">
        <div className="text-blue-400 text-sm font-semibold mb-1">Module Architecture Ready</div>
        <div className="text-gray-400 text-xs">
          This module follows the SmartStock AI design system and integrates with the unified data layer, AI orchestrator, and approval workflow.
        </div>
      </div>
    </div>
  );
}
