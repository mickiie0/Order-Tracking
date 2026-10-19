export type OrderStatus =
  | "in_queue"
  | "in_progress"
  | "completed"
  | "pending_payment";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // e.g. ORD-2587965432159-458
  createdAt: string; // ISO string or human formatted date
  status: OrderStatus;
  customerName: string;
  game?: string; // e.g. "Genshin Impact", "Honkai: Star Rail", "Zenless Zone Zero"
  uid?: string; // In-game UID
  server?: string; // Server e.g. Asia, America
  type: "active" | "past";
  totalAmount: number;
  itemCount: number;
  items?: OrderItem[];
  shippingAddress?: string;
  estimatedDelivery?: string;
}

export interface StatusConfig {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  description: string;
}
