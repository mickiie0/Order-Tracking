"use client";

import React from "react";
import { PackageSearch, History } from "lucide-react";

export type OrderTabType = "active" | "past";

interface OrderTabsProps {
  activeTab: OrderTabType;
  onTabChange: (tab: OrderTabType) => void;
  activeCount: number;
  pastCount: number;
}

export const OrderTabs: React.FC<OrderTabsProps> = ({
  activeTab,
  onTabChange,
  activeCount,
  pastCount,
}) => {
  return (
    <nav
      aria-label="การสลับประเภทออเดอร์"
      className="flex items-center p-1.5 bg-zinc-100/90 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 max-w-md mx-auto"
    >
      <button
        type="button"
        id="tab-active-orders"
        role="tab"
        aria-selected={activeTab === "active"}
        onClick={() => onTabChange("active")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          activeTab === "active"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
        }`}
      >
        <PackageSearch size={16} />
        <span>ออเดอร์ปัจจุบัน</span>
        <span
          className={`ml-1 text-xs px-2 py-0.5 rounded-full font-mono transition-colors ${
            activeTab === "active"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {activeCount}
        </span>
      </button>

      <button
        type="button"
        id="tab-past-orders"
        role="tab"
        aria-selected={activeTab === "past"}
        onClick={() => onTabChange("past")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          activeTab === "past"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
        }`}
      >
        <History size={16} />
        <span>ออเดอร์ที่ผ่านมา</span>
        <span
          className={`ml-1 text-xs px-2 py-0.5 rounded-full font-mono transition-colors ${
            activeTab === "past"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {pastCount}
        </span>
      </button>
    </nav>
  );
};
