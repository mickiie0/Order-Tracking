"use client";

import React from "react";
import { Search, X, AlertTriangle, HelpCircle } from "lucide-react";

interface OrderSearchProps {
  query: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onClear: () => void;
  error: string | null;
  isLoading: boolean;
}

export const OrderSearch: React.FC<OrderSearchProps> = ({
  query,
  onChange,
  onSearch,
  onClear,
  error,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      role="search"
      aria-label="แบบฟอร์มค้นหาคำสั่งซื้อ"
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-2.5"
    >
      <div className="relative flex items-center">
        <label htmlFor="order-search-input" className="sr-only">
          กรอกหมายเลขออเดอร์
        </label>
        <div className="absolute left-4.5 text-zinc-400 pointer-events-none flex items-center">
          <Search size={20} />
        </div>

        <input
          id="order-search-input"
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="เช่น ORD-2587965432159-458"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={error ? "order-search-error" : "order-search-helper"}
          className={`w-full h-13 pl-12 pr-32 rounded-2xl bg-white dark:bg-zinc-900 border text-sm sm:text-base font-mono transition-all duration-200 outline-none shadow-sm ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-rose-600/80"
              : "border-zinc-200 focus:border-zinc-900 dark:border-zinc-800 dark:focus:border-zinc-500 focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/10"
          }`}
        />

        <div className="absolute right-2 flex items-center gap-1.5">
          {query && !isLoading && (
            <button
              type="button"
              onClick={onClear}
              id="btn-clear-search"
              aria-label="ล้างการค้นหา"
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            id="btn-submit-search"
            disabled={isLoading}
            className="h-9 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-xs sm:text-sm font-semibold transition-all duration-150 shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 dark:border-zinc-900/40 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                <span>ค้นหา...</span>
              </>
            ) : (
              <span>ค้นหา</span>
            )}
          </button>
        </div>
      </div>

      {/* Helper and Error Messages */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
        {error ? (
          <p
            id="order-search-error"
            role="alert"
            className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"
          >
            <AlertTriangle size={14} className="shrink-0" />
            <span>{error}</span>
          </p>
        ) : (
          <p
            id="order-search-helper"
            className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"
          >
            <HelpCircle size={13} className="shrink-0 text-zinc-400" />
            <span>รูปแบบที่รองรับ: ขึ้นต้นด้วย &ldquo;ORD-&rdquo; ตามด้วยตัวเลขและขีด (เช่น ORD-2587965432159-458)</span>
          </p>
        )}
      </div>
    </form>
  );
};
