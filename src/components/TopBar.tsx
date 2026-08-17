import { Menu, Search, Bell, Sun, Wifi, User, ChevronDown } from "lucide-react";
import { BUSINESS_INFO } from "../data/mockData";

interface TopBarProps {
  toggleSidebar: () => void;
  activeModule: string;
}

const MODULE_LABELS: Record<string, string> = {
  dashboard: "Executive Dashboard",
  "ai-center": "AI Decision Center",
  alerts: "Smart Alerts",
  inventory: "Inventory Intelligence",
  pos: "Point of Sale",
  orders: "Order Engine",
  suppliers: "Supplier Intelligence",
  customers: "Customer Engine",
  "profit-autopilot": "Profit Autopilot",
  "cash-flow": "Cash Flow Forecast",
  analytics: "Analytics & Reports",
  simulation: "Simulation Lab",
  agents: "AI Executive Team",
  memory: "Business Memory",
  automation: "Automation Builder",
  security: "Security & Audit",
  settings: "Settings",
};

export default function TopBar({ toggleSidebar, activeModule }: TopBarProps) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="fixed top-0 right-0 left-0 z-30 h-14 bg-gray-950/95 backdrop-blur border-b border-gray-800/60 flex items-center px-4 gap-4">
      <button
        onClick={toggleSidebar}
        className="text-gray-400 hover:text-gray-200 p-1 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-gray-500">{MODULE_LABELS[activeModule] || activeModule}</span>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 w-64">
        <Search size={14} className="text-gray-500" />
        <input
          placeholder='Search anything...'
          className="bg-transparent text-gray-300 text-sm outline-none flex-1 placeholder:text-gray-600"
        />
      </div>

      {/* Status indicators */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-green-400">
          <Wifi size={14} />
          <span className="text-xs hidden sm:block">Online</span>
        </div>

        <div className="flex items-center gap-1.5 text-yellow-400">
          <Sun size={14} />
          <span className="text-xs hidden sm:block">{greeting}</span>
        </div>

        <button className="relative text-gray-400 hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
          <Bell size={16} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <User size={13} className="text-white" />
          </div>
          <div className="hidden sm:block text-xs">
            <div className="text-gray-200 font-medium leading-none">Owner</div>
            <div className="text-gray-500 mt-0.5 truncate max-w-24">{BUSINESS_INFO.name}</div>
          </div>
          <ChevronDown size={12} className="text-gray-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
