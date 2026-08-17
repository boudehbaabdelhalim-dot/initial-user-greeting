
import {
  LayoutDashboard,
  Brain,
  Package,
  ShoppingCart,
  Users,
  Truck,
  TrendingUp,
  DollarSign,
  Bell,
  Settings,
  FlaskConical,
  Zap,
  Shield,
  CheckSquare,
  BarChart3,
  BookOpen,
  Store,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  {
    group: "COMMAND",
    items: [
      { id: "dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
      { id: "ai-center", label: "AI Decision Center", icon: Brain },
      { id: "alerts", label: "Smart Alerts", icon: Bell, badge: 5 },
    ],
  },
  {
    group: "OPERATIONS",
    items: [
      { id: "inventory", label: "Inventory Intelligence", icon: Package },
      { id: "pos", label: "Point of Sale", icon: Store },
      { id: "orders", label: "Order Engine", icon: ShoppingCart },
      { id: "suppliers", label: "Supplier Intelligence", icon: Truck },
    ],
  },
  {
    group: "INTELLIGENCE",
    items: [
      { id: "customers", label: "Customer Engine", icon: Users },
      { id: "profit-autopilot", label: "Profit Autopilot", icon: TrendingUp, badge: 5 },
      { id: "cash-flow", label: "Cash Flow Forecast", icon: DollarSign },
      { id: "analytics", label: "Analytics & Reports", icon: BarChart3 },
    ],
  },
  {
    group: "AI LAB",
    items: [
      { id: "simulation", label: "Simulation Lab", icon: FlaskConical },
      { id: "agents", label: "AI Executive Team", icon: Zap },
      { id: "memory", label: "Business Memory", icon: BookOpen },
      { id: "automation", label: "Automation Builder", icon: CheckSquare },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { id: "security", label: "Security & Audit", icon: Shield },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
  collapsed: boolean;
}

export default function Sidebar({ activeModule, setActiveModule, collapsed }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-40 flex flex-col
        bg-gray-950 border-r border-gray-800/60
        transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800/60">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">S</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-white font-bold text-sm leading-none">SmartStock</div>
            <div className="text-blue-400 text-xs font-medium mt-0.5">AI Business OS</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <div className="text-gray-500 text-[10px] font-semibold tracking-widest uppercase px-2 mb-1">
                {group.group}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left
                      transition-all duration-150 group relative
                      ${isActive
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                      }
                    `}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                        {isActive && <ChevronRight size={12} className="text-blue-400 flex-shrink-0" />}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold rounded-full w-3 h-3 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* AI Trust Score */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800/60">
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-400 text-xs">AI Trust Score</span>
              <span className="text-green-400 text-xs font-bold">94%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "94%" }} />
            </div>
            <div className="text-gray-500 text-[10px] mt-1">Based on 2,840 decisions</div>
          </div>
        </div>
      )}
    </aside>
  );
}
