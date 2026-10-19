import React from "react";
import { PackageX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "ไม่พบข้อมูลคำสั่งซื้อ",
  description = "กรุณาตรวจสอบหมายเลขออเดอร์ให้ถูกต้อง หรือสลับแท็บเพื่อดูรายการอื่น",
  onReset,
  actionText = "แสดงออเดอร์ทั้งหมด",
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30"
    >
      <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4 shadow-xs">
        <PackageX size={28} />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          id="btn-empty-reset"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer"
        >
          <RotateCcw size={15} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
