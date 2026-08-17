import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./modules/Dashboard";
import AIDecisionCenter from "./modules/AIDecisionCenter";
import InventoryIntelligence from "./modules/InventoryIntelligence";
import ProfitAutopilot from "./modules/ProfitAutopilot";
import CustomerEngine from "./modules/CustomerEngine";
import SupplierIntelligence from "./modules/SupplierIntelligence";
import SimulationLab from "./modules/SimulationLab";
import AIAgents from "./modules/AIAgents";
import BusinessMemory from "./modules/BusinessMemory";
import CashFlowForecast from "./modules/CashFlowForecast";
import Analytics from "./modules/Analytics";
import Placeholder from "./modules/Placeholder";

type ModuleId =
  | "dashboard"
  | "ai-center"
  | "alerts"
  | "inventory"
  | "pos"
  | "orders"
  | "suppliers"
  | "customers"
  | "profit-autopilot"
  | "cash-flow"
  | "analytics"
  | "simulation"
  | "agents"
  | "memory"
  | "automation"
  | "security"
  | "settings";

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "ai-center":
        return <AIDecisionCenter />;
      case "inventory":
        return <InventoryIntelligence />;
      case "profit-autopilot":
        return <ProfitAutopilot />;
      case "customers":
        return <CustomerEngine />;
      case "suppliers":
        return <SupplierIntelligence />;
      case "simulation":
        return <SimulationLab />;
      case "agents":
        return <AIAgents />;
      case "memory":
        return <BusinessMemory />;
      case "cash-flow":
        return <CashFlowForecast />;
      case "analytics":
        return <Analytics />;
      case "alerts":
        return (
          <Placeholder
            title="Smart Alert Center"
            description="AI-prioritized notifications grouped by impact level. Critical alerts first, noise eliminated."
            icon="🔔"
            features={[
              "Critical / High / Medium / Low priority system",
              "Alert grouping and deduplication",
              "AI decides what deserves owner attention",
              "One-click action from each alert",
              "Alert history and audit trail",
              "Real-time WebSocket updates",
            ]}
          />
        );
      case "pos":
        return (
          <Placeholder
            title="Point of Sale Engine"
            description="Offline-first POS system with AI-powered suggestions, barcode scanning, and real-time inventory sync."
            icon="🏪"
            features={[
              "Offline-first — works without internet",
              "Barcode scanner & camera support",
              "AI product recommendations at checkout",
              "Multi-payment: cash, card, credit, digital",
              "Receipt engine — digital & print",
              "Real-time sync to central inventory",
            ]}
          />
        );
      case "orders":
        return (
          <Placeholder
            title="Unified Order Engine"
            description="One engine for all order types — in-store, online, pickup, delivery, reservation, layaway."
            icon="🛒"
            features={[
              "In-Store · Online · Reservation · Pickup",
              "Delivery · Preorder · Special Order",
              "Layaway · Credit order support",
              "Full order lifecycle management",
              "Cross-channel inventory sync",
              "Order status tracking & history",
            ]}
          />
        );
      case "automation":
        return (
          <Placeholder
            title="Automation Builder"
            description="Build WHEN/IF/THEN rules without coding. Automate routine decisions with human approval for sensitive actions."
            icon="⚡"
            features={[
              "WHEN / IF / THEN visual rule builder",
              "No coding required",
              "All sensitive actions require human approval",
              "Business Rule Engine",
              "Scheduled automations",
              "Automation history & audit trail",
            ]}
          />
        );
      case "security":
        return (
          <Placeholder
            title="Security & Audit Center"
            description="Shrinkage detection, anomaly scoring, full audit trail, RBAC, and data health monitoring."
            icon="🔐"
            features={[
              "Shrinkage intelligence — anomaly scoring",
              "Full audit trail — who, when, what",
              "Role-Based Access Control (RBAC)",
              "Session security & rate limiting",
              "Data Health Score — 81/100",
              "Recall management system",
            ]}
          />
        );
      case "settings":
        return (
          <Placeholder
            title="System Settings & Configuration"
            description="Business configuration, industry blueprints, integrations, plugins, API platform, and data portability."
            icon="⚙️"
            features={[
              "Industry Blueprints — Grocery, Café, Pharmacy...",
              "Plugin System — payment, AI, accounting",
              "API Platform — REST, Webhooks, OAuth",
              "Import/Migration Wizard",
              "Backup & Disaster Recovery",
              "Internationalization & Accessibility",
            ]}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  const sidebarWidth = sidebarCollapsed ? "4rem" : "16rem";

  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={(id) => setActiveModule(id as ModuleId)}
        collapsed={sidebarCollapsed}
      />
      <TopBar
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeModule={activeModule}
      />
      <main
        className="transition-all duration-300 pt-14 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          {renderModule()}
        </div>
      </main>
    </div>
  );
}
