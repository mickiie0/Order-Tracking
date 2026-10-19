import type { Metadata } from "next";
import { OrderTrackingClient } from "@/components/OrderTrackingClient";
import { Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
  title: "ระบบตรวจสอบสถานะเติมเกม (Game Top-Up Order Tracking)",
  description:
    "ตรวจสอบสถานะการเติมเกม Genshin Impact, Honkai: Star Rail, Zenless Zone Zero และเกมอื่นๆ แบบเรียลไทม์ พร้อมตรวจสอบคิวและประวัติการเติม",
  keywords: [
    "Game Top-Up Tracking",
    "เติมเกม",
    "เช็คสถานะเติมเกม",
    "Genshin Impact",
    "Honkai Star Rail",
    "Zenless Zone Zero",
  ],
};

export default function OrderTrackingPage() {
  return (
    <main className="min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 pb-20">
      {/* Top Header */}
      <header className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Gamepad2 size={22} />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight">GAMEFLOW</span>
              <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 ml-1.5 px-1.5 py-0.5 rounded-sm bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800">
                TOP-UP
              </span>
            </div>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:block">
            Game Top-Up Status Tracking Portal
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-8">
        {/* Hero Title Section */}
        <section aria-labelledby="page-title" className="text-center space-y-3">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
          >
            ติดตามสถานะการเติมเกม
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            กรอกรหัสออเดอร์เพื่อเช็คคิวการเติม ตรวจสอบความถูกต้องของ UID
            และยืนยันการส่งมอบแพ็กเกจเกมเข้าบัญชีได้แบบเรียลไทม์
          </p>
        </section>

        {/* Interactive Order Tracking Component */}
        <OrderTrackingClient />
      </div>
    </main>
  );
}
