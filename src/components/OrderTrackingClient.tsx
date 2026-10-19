"use client";

import React, { useState, useTransition } from "react";
import { Order, OrderStatus } from "@/types/order";
import { MOCK_ORDERS, STATUS_CONFIG } from "@/data/mockOrders";
import { OrderSearch } from "./OrderSearch";
import { OrderTabs, OrderTabType } from "./OrderTabs";
import { OrderCard } from "./OrderCard";
import { OrderSkeleton } from "./OrderSkeleton";
import { EmptyState } from "./EmptyState";
import { StatusBadge } from "./StatusBadge";
import {
  Boxes,
  Sparkles,
  Info,
} from "lucide-react";

// Regex: Must start with ORD- followed by numbers and optional hyphens with numbers
// e.g., ORD-2587965432159-458 or ORD-123456
const ORDER_REGEX = /^ORD-\d+(-\d+)*$/i;

export const OrderTrackingClient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OrderTabType>("active");
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  // Validate Search Format
  const validateOrder = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setInputError(null);
      return true;
    }

    if (!ORDER_REGEX.test(trimmed)) {
      setInputError(
        'รูปแบบไม่ถูกต้อง: ต้องขึ้นต้นด้วย "ORD-" ตามด้วยตัวเลขและเครื่องหมายขีด (เช่น ORD-2587965432159-458)'
      );
      return false;
    }

    setInputError(null);
    return true;
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (inputError && val.trim()) {
      // Re-validate dynamically if there's already an error
      if (ORDER_REGEX.test(val.trim())) {
        setInputError(null);
      }
    } else if (!val.trim()) {
      setInputError(null);
    }
  };

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSubmittedQuery("");
      setInputError(null);
      return;
    }

    if (!validateOrder(trimmed)) {
      return;
    }

    // Simulate skeleton loading 0.6 seconds
    setIsLoading(true);
    setTimeout(() => {
      startTransition(() => {
        setSubmittedQuery(trimmed);
        setIsLoading(false);
      });
    }, 600);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSubmittedQuery("");
    setInputError(null);
  };

  const handlePresetSelect = (orderId: string) => {
    setSearchQuery(orderId);
    setInputError(null);
    setIsLoading(true);
    setTimeout(() => {
      startTransition(() => {
        setSubmittedQuery(orderId);
        // Switch tab to the appropriate tab if needed
        const matched = MOCK_ORDERS.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
        if (matched) {
          setActiveTab(matched.type);
        }
        setIsLoading(false);
      });
    }, 500);
  };

  // Filter orders
  const currentOrders = MOCK_ORDERS.filter((order) => {
    // If search active
    if (submittedQuery) {
      return order.id.toLowerCase().includes(submittedQuery.toLowerCase());
    }
    // Else filter by active/past tab
    return order.type === activeTab;
  });

  const activeCount = MOCK_ORDERS.filter((o) => o.type === "active").length;
  const pastCount = MOCK_ORDERS.filter((o) => o.type === "past").length;

  const statuses: OrderStatus[] = [
    "in_queue",
    "in_progress",
    "completed",
    "pending_payment",
  ];

  return (
    <div className="space-y-10">
      {/* 1. Search Box Section */}
      <section aria-labelledby="search-section-heading" className="space-y-4">
        <h2 id="search-section-heading" className="sr-only">
          ค้นหาหมายเลขออเดอร์
        </h2>
        <OrderSearch
          query={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleSearchSubmit}
          onClear={handleClear}
          error={inputError}
          isLoading={isLoading}
        />

        {/* Quick test buttons for testers */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1 font-medium text-zinc-400">
            <Sparkles size={13} /> ตัวอย่างเลขออเดอร์สำหรับทดสอบ:
          </span>
          {MOCK_ORDERS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => handlePresetSelect(o.id)}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
            >
              {o.id}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSearchQuery("WRONG-12345");
              validateOrder("WRONG-12345");
            }}
            className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 text-[11px] font-mono border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
            title="ทดสอบ Error State"
          >
            [ทดสอบ Error format]
          </button>
        </div>
      </section>

      {/* 2. Status Badge Guide / Summary Section */}
      <section
        aria-labelledby="status-guide-heading"
        className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 p-4 sm:p-5 backdrop-blur-xs"
      >
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-zinc-400" />
          <h2
            id="status-guide-heading"
            className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            คำอธิบาย 4 สถานะการติดตามออเดอร์
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {statuses.map((st) => (
            <div
              key={st}
              className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <StatusBadge status={st} size="sm" />
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {STATUS_CONFIG[st].description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Tabs Navigation */}
      <section aria-labelledby="tab-section-heading">
        <h2 id="tab-section-heading" className="sr-only">
          แท็บหมวดหมู่ออเดอร์
        </h2>

        {submittedQuery ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <Boxes size={18} className="text-zinc-500 shrink-0" />
              <span>
                ผลการค้นหาสำหรับ:{" "}
                <strong className="font-mono font-bold text-zinc-900 dark:text-white">
                  &ldquo;{submittedQuery}&rdquo;
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 underline underline-offset-4 cursor-pointer"
            >
              ล้างการค้นหา & กลับไปดูตามแท็บ
            </button>
          </div>
        ) : (
          <OrderTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
            }}
            activeCount={activeCount}
            pastCount={pastCount}
          />
        )}
      </section>

      {/* 4. Order List & UI States (Normal, Loading, Empty, Error) */}
      <section aria-labelledby="order-list-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="order-list-heading"
            className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            {submittedQuery
              ? `รายการที่ตรงกับการค้นหา (${currentOrders.length})`
              : activeTab === "active"
              ? `ออเดอร์ปัจจุบันที่กำลังดำเนินการ (${currentOrders.length})`
              : `ประวัติออเดอร์ที่ผ่านมา (${currentOrders.length})`}
          </h2>
        </div>

        {/* State: Loading (Skeleton) */}
        {isLoading ? (
          <div className="space-y-4">
            <OrderSkeleton />
            <OrderSkeleton />
          </div>
        ) : currentOrders.length > 0 ? (
          /* State: Normal Data List */
          <div className="space-y-4">
            {currentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          /* State: Empty State */
          <EmptyState
            title={
              submittedQuery
                ? `ไม่พบเลขออเดอร์ "${submittedQuery}"`
                : "ยังไม่มีรายการออเดอร์ในหมวดนี้"
            }
            description={
              submittedQuery
                ? "โปรดตรวจสอบเลขออเดอร์อีกครั้ง หรือเลือกดูออเดอร์จากตัวอย่างด้านบน"
                : "เมื่อคุณทำการสั่งซื้อสำเร็จ รายการออเดอร์จะแสดงที่นี่โดยอัตโนมัติ"
            }
            onReset={submittedQuery ? handleClear : undefined}
            actionText="แสดงออเดอร์ทั้งหมด"
          />
        )}
      </section>
    </div>
  );
};
