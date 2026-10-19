"use client";

import React, { useState } from "react";
import { Order } from "@/types/order";
import { StatusBadge } from "./StatusBadge";
import {
  Copy,
  Check,
  Calendar,
  Package,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Clock,
  Gamepad2,
  User,
  ShieldCheck,
} from "lucide-react";

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [copied, setCopied] = useState(false);
  const [copiedUid, setCopiedUid] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleCopyUid = async (uid: string) => {
    try {
      await navigator.clipboard.writeText(uid);
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2000);
    } catch {
      setCopiedUid(false);
    }
  };

  return (
    <article
      aria-labelledby={`order-heading-${order.id}`}
      className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 overflow-hidden"
    >
      <div className="p-5 md:p-6 space-y-4">
        {/* Header row: Order ID and Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              เลขออเดอร์:
            </span>
            <h3
              id={`order-heading-${order.id}`}
              className="text-base sm:text-lg font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {order.id}
            </h3>

            {/* One-click Copy Button */}
            <button
              type="button"
              id={`btn-copy-${order.id}`}
              onClick={handleCopy}
              title="คัดลอกเลขออเดอร์"
              aria-label={copied ? "คัดลอกเรียบร้อยแล้ว" : "คัดลอกเลขออเดอร์"}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all duration-150 cursor-pointer ${
                copied
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700"
                  : "bg-zinc-100/80 hover:bg-zinc-200/80 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-700"
              }`}
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>คัดลอกแล้ว!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>คัดลอก</span>
                </>
              )}
            </button>
          </div>

          <div className="shrink-0">
            <StatusBadge status={order.status} size="md" />
          </div>
        </div>

        {/* Date and Basic Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Calendar size={15} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
            <span>
              วันที่สั่ง: <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{order.createdAt}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Package size={15} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
            <span>
              จำนวน: <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{order.itemCount} แพ็กเกจ</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 sm:col-span-2 md:col-span-1">
            <CreditCard size={15} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
            <span>
              ยอดรวม:{" "}
              <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                ฿{order.totalAmount.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        {/* Customer & Game Info Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <User size={14} className="text-zinc-400" />
              <span>ลูกค้า: <strong className="font-medium text-zinc-800 dark:text-zinc-200">{order.customerName}</strong></span>
            </div>

            {order.game && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/70 dark:border-indigo-800/60">
                <Gamepad2 size={12} />
                {order.game}
              </span>
            )}

            {order.uid && (
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[11px] border border-zinc-200 dark:border-zinc-700">
                <span className="text-zinc-400 font-sans font-medium">UID:</span>
                <span className="font-bold tracking-wide">{order.uid}</span>
                {order.server && (
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">({order.server})</span>
                )}
                <button
                  type="button"
                  onClick={() => handleCopyUid(order.uid!)}
                  title="คัดลอก UID"
                  aria-label="คัดลอก UID"
                  className="ml-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  {copiedUid ? (
                    <Check size={11} className="text-emerald-500" />
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            id={`btn-expand-${order.id}`}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 self-end sm:self-auto"
          >
            <span>{isExpanded ? "ซ่อนรายละเอียด" : "ดูแพ็กเกจที่เติม"}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Collapsible Details Panel */}
        {isExpanded && (
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3.5 bg-zinc-50/50 dark:bg-zinc-950/40 -mx-5 -mb-5 md:-mx-6 md:-mb-6 p-5 md:p-6 transition-all">
            {order.uid && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">บัญชีปลายทาง: </span>
                    <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{order.game} ({order.server ?? "Asia"})</strong>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  <span>UID: {order.uid}</span>
                </div>
              </div>
            )}

            {order.estimatedDelivery && (
              <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <Clock size={15} className="text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">ระยะเวลาดำเนินการ: </span>
                  {order.estimatedDelivery}
                </div>
              </div>
            )}

            {order.items && order.items.length > 0 && (
              <div className="mt-3 space-y-2">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  รายการแพ็กเกจที่เติม:
                </span>
                <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-2 sm:p-3">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-2 first:pt-1 last:pb-1 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {item.name}
                        </span>
                        <span className="text-zinc-400 font-mono">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 font-mono">
                        ฿{item.price.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
