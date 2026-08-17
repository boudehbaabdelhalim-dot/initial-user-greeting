import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: "blue" | "green" | "red" | "yellow" | "violet" | "none";
}

export function Card({ children, className, glow = "none" }: CardProps) {
  const glowMap = {
    blue: "shadow-blue-500/10 shadow-lg border-blue-500/20",
    green: "shadow-green-500/10 shadow-lg border-green-500/20",
    red: "shadow-red-500/10 shadow-lg border-red-500/20",
    yellow: "shadow-yellow-500/10 shadow-lg border-yellow-500/20",
    violet: "shadow-violet-500/10 shadow-lg border-violet-500/20",
    none: "",
  };

  return (
    <div
      className={cn(
        "bg-gray-900 border border-gray-800 rounded-xl p-4",
        glow !== "none" && glowMap[glow],
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  changePositive?: boolean;
  icon?: ReactNode;
  subtitle?: string;
  color?: "blue" | "green" | "red" | "yellow" | "violet";
}

export function StatCard({
  title,
  value,
  change,
  changePositive,
  icon,
  subtitle,
  color = "blue",
}: StatCardProps) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    yellow: "from-yellow-500 to-yellow-600",
    violet: "from-violet-500 to-violet-600",
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}
        >
          <span className="text-white">{icon}</span>
        </div>
        {change !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              changePositive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {changePositive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-gray-400 text-xs">{title}</div>
      {subtitle && <div className="text-gray-600 text-[10px] mt-0.5">{subtitle}</div>}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-white font-bold text-base">{title}</h2>
        {subtitle && <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
}) {
  const variants = {
    default: "bg-gray-800 text-gray-300",
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    danger: "bg-red-500/20 text-red-400 border border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    purple: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
