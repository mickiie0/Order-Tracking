# GameFlow Top-Up — Game Top-Up Order Tracking Web Application

ระบบติดตามและตรวจสอบสถานะการเติมเกมแบบเรียลไทม์ (Game Top-Up Order Tracking Portal) พัฒนาด้วย Next.js (App Router), TypeScript และ Tailwind CSS รองรับการตรวจสอบคิวเติมเกมยอดนิยม เช่น Genshin Impact, Honkai: Star Rail และ Zenless Zone Zero (ZZZ) พร้อมการตรวจสอบ UID บัญชีผู้เล่น การออกแบบระดับพรีเมียม สถาปัตยกรรม Semantic HTML และมาตรฐานด้าน Web Accessibility (a11y)

---

## 1. Project Overview

**GameFlow Top-Up** ถูกสร้างขึ้นเพื่อตอบโจทย์ร้านค้าและแพลตฟอร์มรับเติมเกมออนไลน์ ช่วยให้ผู้เล่นสามารถค้นหาและตรวจสอบสถานะคิวการเติม ตรวจสอบความถูกต้องของ UID ในเกม และติดตามการส่งมอบไอเทม/เพชรเข้าสู่ไอดีได้อย่างแม่นยำและโปร่งใส

### ฟีเจอร์หลัก (Key Features)
- **Real-time Order Search & Filter:** ค้นหาออเดอร์ตามรหัสคำสั่งซื้อ (Order ID) เช่น `ORD-2587965432159-458` พร้อมระบบจำแนกสถานะคำสั่งซื้อแบบเรียลไทม์
- **Game-Specific Tracking & UID Verification:** แสดงข้อมูลเกมที่เติม (Genshin Impact, Honkai: Star Rail, Zenless Zone Zero), เซิร์ฟเวอร์ (เช่น Asia), และ In-game UID เพื่อความถูกต้องก่อนส่งมอบ
- **One-Click Copy (Order ID & UID):** คัดลอกเลขออเดอร์หรือ UID ได้ในคลิกเดียว พร้อม Interactive Feedback (`aria-label` และ Visual badge)
- **Top-Up Status Badges & Explanations:** แสดง 4 สถานะสำคัญของการเติมเกม ได้แก่:
  - `In Queue / รอคิวเติม`
  - `In Progress / กำลังเติมเงิน`
  - `Completed / เติมสำเร็จแล้ว`
  - `Pending Payment / รอชำระเงิน`
- **Collapsible Order Details:** ตรวจสอบรายละเอียดแพ็กเกจที่เติม (เช่น Blessing of the Welkin Moon, Genesis Crystals, Oneiric Shards), ยอดชำระเงิน, และระยะเวลาดำเนินการโดยประมาณ
- **Responsive & Dark Mode Support:** รองรับการใช้งานสมบูรณ์แบบทุกขนาดหน้าจอ (Mobile-First) พร้อมการแสดงผล Dark Mode อัตโนมัติ

### เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components & Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) เพื่อ Type Safety และ Data Modeling ที่รัดกุม
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconography:** [Lucide React](https://lucide.dev/)

---

## 2. Getting Started

### ข้อกำหนดเบื้องต้น (Prerequisites)
- [Node.js](https://nodejs.org/) เวอร์ชั่น 18.18.0 ขึ้นไป
- แพ็กเกจเมเนเจอร์: `npm`, `pnpm`, หรือ `yarn`

### ขั้นตอนการติดตั้งและรันโปรเจกต์

1. **โคลนคลังโค้ด (Clone Repository):**
   ```bash
   git clone https://github.com/your-username/game-topup-order-tracking.git
   cd game-topup-order-tracking
   ```

2. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   # หรือใช้ pnpm
   pnpm install
   ```

3. **รัน Development Server:**
   ```bash
   npm run dev
   # หรือใช้ pnpm
   pnpm dev
   ```

4. **เปิดเบราว์เซอร์เพื่อเข้าใช้งาน:**
   เข้าผ่านทาง [http://localhost:3000](http://localhost:3000)

---

## 3. SEO & Semantic Architecture

โปรเจกต์นี้ได้รับการออกแบบตามแนวทางปฏิบัติที่ดีที่สุดของ **Modern Web Standards, Semantic HTML5 และ Accessibility (WCAG)**:

### 3.1 โครงสร้าง Heading Hierarchy ที่ถูกต้องตามหลัก SEO
- **Single `<h1>` per Page:** กำหนด `<h1>` ไว้เฉพาะหัวข้อหลักของหน้า (`ติดตามสถานะการเติมเกม`) เพื่อเป็นแกนนำของเอกสารและ SEO Engine
- **Logical Heading Progression (H1 -> H2 -> H3):**
  - `<h1>`: ชื่อหน้าหลัก / Core Proposition (`ติดตามสถานะการเติมเกม`)
  - `<h2>`: สำหรับจัดกลุ่มส่วนสำคัญ เช่น แบบฟอร์มการค้นหา (`sr-only`), คำอธิบายสถานะทั้ง 4, และกลุ่มผลลัพธ์คำสั่งซื้อ
  - `<h3>`: ใช้ภายใน `<article>` ของแต่ละออเดอร์ เพื่อระบุรหัสคำสั่งซื้ออย่างเป็นเอกเทศ
- **Heading Association:** ใช้แอตทริบิวต์ `aria-labelledby` เชื่อมโยง `<section>` และ `<article>` เข้ากับ Heading IDs ที่เกี่ยวข้อง เพื่อให้ทั้ง Search Engine Bots และ Assistive Technologies ตีความโครงสร้างเอกสารได้อย่างสมบูรณ์

### 3.2 Semantic HTML Elements
- หลีกเลี่ยงการใช้ `<div>` ซ้อนกันอย่างไร้ความหมาย (Div Soup) โดยเลือกใช้:
  - `<main>` กำหนดขอบเขตเนื้อหาหลักของหน้า
  - `<header>` สำหรับแถบนำทางและ Identity ของระบบ (แบรนด์ GAMEFLOW TOP-UP)
  - `<section>` แบ่งสัดส่วนการค้นหา คำแนะนำสถานะ และส่วนแสดงผลรายการออเดอร์
  - `<article>` ครอบคลุมการแสดงผลข้อมูลคำสั่งซื้อแต่ละรายการ
  - `<button>` สำหรับการโต้ตอบคลิกทุกจุด (Copy, Expand, Filter tabs)

### 3.3 Next.js App Router Metadata Configuration
- กำหนด `Metadata` แบบ Static/Dynamic ใน Server Component ([src/app/page.tsx](file:///c:/Mickiie/coding/inblack/1/src/app/page.tsx)):
  - **Title Tag:** `"ระบบตรวจสอบสถานะเติมเกม (Game Top-Up Order Tracking)"`
  - **Meta Description:** อธิบายขอบเขตการให้บริการเติมเกม Genshin Impact, Honkai: Star Rail, Zenless Zone Zero อย่างกระชับและดึงดูด CTR
  - **Keywords:** คำค้นหาที่ตรงกับกลุ่มผู้เล่น เช่น `Game Top-Up Tracking`, `เติมเกม`, `Genshin Impact`, `Honkai Star Rail`, `Zenless Zone Zero`

### 3.4 Web Accessibility (a11y) & Interactive Elements
- **Interactive Feedback:** ปุ่มคัดลอก (Copy Button) มีการระบุ `aria-label` ชัดเจน เช่น สลับสถานะระหว่าง `"คัดลอกเลขออเดอร์"` / `"คัดลอก UID"` และ `"คัดลอกเรียบร้อยแล้ว"` ช่วยให้ผู้ใช้ Screen Reader รับรู้ผลลัพธ์ได้ทันที
- **State Expansion:** ปุ่มดูแพ็กเกจที่เติมมีการระบุ `aria-expanded="true/false"` เพื่อแจ้งสถานะการเปิด/ปิดเนื้อหา

---

## 4. Search Engine Indexing Analysis

### คำถามเชิงสถาปัตยกรรม (Architectural Question):
> *"สำหรับหน้า Order Tracking ควรหรือไม่ควรให้ Search Engine Index หน้านี้ และเพราะอะไร?"*

### บทวิเคราะห์และข้อสรุปทางวิศวกรรม (Engineering Conclusion):
> **คำตอบ: ❌ "ไม่ควรให้ Search Engine ทำการ Index หน้านี้อย่างเด็ดขาด (ควรระบุ `noindex, nofollow`)"**

---

### เหตุผลสนับสนุน 4 ประการหลัก:

#### 1. ความเป็นส่วนตัวและความปลอดภัยของข้อมูลผู้เล่น (Data Privacy & In-Game Account Security)
หน้าตรวจสอบคำสั่งซื้อการเติมเกมประกอบด้วยข้อมูลเฉพาะตัวที่ละเอียดอ่อน:
- ชื่อบัญชีลูกค้า / นามแฝงผู้เล่น (Gamer Tag/Nickname)
- **UID ในเกม (In-Game UID) และ Server ประจำตัวผู้เล่น**
- ประวัติการเติมเงิน ยอดเงิน และแพ็กเกจที่ซื้อ

หาก Search Engine (เช่น Google, Bing) บันทึกและนำหน้านี้ไปแสดงบนผลการค้นหาสาธารณะ อาจทำให้เกิดความเสี่ยงด้านความปลอดภัยของบัญชีเกม การถูกสวมรอย (Social Engineering) และละเมิดกฎหมายคุ้มครองข้อมูลส่วนบุคคล (**PDPA, GDPR**)

#### 2. ความแปรผันตาม Session / พารามิเตอร์ และเนื้อหาที่ไม่คงที่ (Dynamic & Thin/Fragmented Content)
- หน้าติดตามสถานะเป็น **Transactional / State-dependent Interface** ที่แสดงผลตาม `orderId` หรือ token ชั่วคราว
- สำหรับผู้ใช้งานทั่วไปที่เข้ามาผ่าน Search Engine โดยไม่มีเลขออเดอร์ จะพบเพียงหน้าฟอร์มเปล่า (Empty State) ซึ่งจัดเป็น **"Thin Content"** หรือเนื้อหาที่มีมูลค่าต่ำในมุมมองของ Search Engine Algorithms (เช่น Google Panda / Helpful Content System)

#### 3. การสูญเสีย Crawl Budget โดยไม่เกิดประโยชน์ (Waste of Crawl Budget)
- ในระบบร้านรับเติมเกมที่มีคำสั่งซื้อหมุนเวียนจำนวนมาก การปล่อยให้ Crawler ไต่ URL ที่มีพารามิเตอร์ของออเดอร์ (เช่น `/tracking?order=ORD-2587965432159-458`) จะทำให้ Bot สิ้นเปลือง **Crawl Budget**
- สิ่งนี้จะแย่งเวลาและทรัพยากรของ Crawler จากหน้าที่ต้องการทำ SEO จริงๆ เช่น หน้ารายการแพ็กเกจเติมเกม (Catalog Pages), โปรโมชันส่วนลด (Promotion Pages), หรือหน้าบทความแนะนำการเล่น (Game Guides / Blog Pages)

#### 4. ปัญหาเรื่องเนื้อหาซ้ำซ้อนและ URL Canonicalization (Duplicate Content Issues)
- บ่อยครั้งที่ URL สถานะการเติมสามารถเข้าถึงได้จากหลายพารามิเตอร์ (Campaign tags, Payment gateway callbacks, Referral IDs) ซึ่งทำให้เกิดปัญหา Duplicate Content มหาศาลในระบบ Index ของ Search Engine

---

### ข้อเสนอแนะในการตั้งค่าเชิงเทคนิค (Recommended Technical Implementation)

1. **กำหนดผ่าน Next.js Metadata API:**
   ```typescript
   // src/app/page.tsx หรือ src/app/tracking/page.tsx
   export const metadata: Metadata = {
     title: "ติดตามสถานะการเติมเกม | GameFlow Top-Up",
     robots: {
       index: false,
       follow: false,
       nocache: true,
       googleBot: {
         index: false,
         follow: false,
         noimageindex: true,
       },
     },
   };
   ```

2. **กำหนดผ่าน `robots.txt`:**
   ```txt
   # public/robots.txt
   User-agent: *
   Disallow: /tracking
   Disallow: /orders
   Disallow: /*?*order=
   ```

3. **HTTP Header Response:**
   ```http
   X-Robots-Tag: noindex, nofollow, noarchive
   ```
