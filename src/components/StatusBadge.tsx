import React from "react";
import { OrderStatus } from "@/types/order";
import { STATUS_CONFIG } from "@/data/mockOrders";
import { Clock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  showIcon = true,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.in_queue;

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs font-medium gap-1.5",
    md: "px-3 py-1 text-xs font-semibold gap-2",
    lg: "px-3.5 py-1.5 text-sm font-semibold gap-2.5",
  };

  const renderIcon = () => {
    const iconSize = size === "sm" ? 12 : 14;
    switch (status) {
      case "in_queue":
        return <Clock size={iconSize} className="shrink-0" />;
      case "in_progress":
        return <Loader2 size={iconSize} className="animate-spin shrink-0" />;
      case "completed":
        return <CheckCircle2 size={iconSize} className="shrink-0" />;
      case "pending_payment":
        return <AlertCircle size={iconSize} className="shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} ${sizeClasses[size]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dotColor}`}
        aria-hidden="true"
      />
      {showIcon && renderIcon()}
      <span>{config.label}</span>
    </span>
  );
};
