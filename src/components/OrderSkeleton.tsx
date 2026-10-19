import React from "react";

export const OrderSkeleton: React.FC = () => {
  return (
    <div
      aria-label="กำลังโหลดข้อมูลออเดอร์"
      className="p-5 md:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs animate-pulse space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-6 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>
        <div className="h-7 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>

      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3.5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
          <div className="h-3.5 w-44 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
        </div>
        <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
};
