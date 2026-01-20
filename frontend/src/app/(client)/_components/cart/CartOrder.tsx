import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  X,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "delivering" | "delivered";
  createdAt: Date;
  address: string;
}

interface CartOrderProps {
  onBack: () => void;
  onSubmit: () => void;
}

// TODO: Replace with actual order data from your backend/context
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      { id: "1", name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { id: "2", name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    total: 34.97,
    status: "delivering",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    address: "123 Main St, Apt 4B",
  },
  {
    id: "ORD-002",
    items: [{ id: "3", name: "Chicken Burger", quantity: 1, price: 10.99 }],
    total: 11.98,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    address: "123 Main St, Apt 4B",
  },
  {
    id: "ORD-003",
    items: [
      { id: "4", name: "Spaghetti Carbonara", quantity: 1, price: 14.99 },
      { id: "5", name: "Garlic Bread", quantity: 2, price: 4.99 },
    ],
    total: 24.97,
    status: "delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    address: "123 Main St, Apt 4B",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  delivering: {
    label: "On the way",
    icon: Truck,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  delivered: {
    label: "Delivered",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function OrderCard({ order }: { order: Order }) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex flex-col px-3 gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-8 items-center text-black font-bold text-[16px] ">
          <span>{order.total}</span>
          <span>{order.id}</span>
        </div>

        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bgColor}`}
        >
          <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
          <span className={`text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.quantity}x {item.name}
            </span>
            <span className="text-gray-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className="text-xs text-gray-500">
          {formatTimeAgo(order.createdAt)}
        </span>
        <span className="font-semibold text-black">
          ${order.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export function CartOrder({ onBack }: CartOrderProps) {
  const activeOrders = mockOrders.filter(
    (o) =>
      o.status === "pending" ||
      o.status === "confirmed" ||
      o.status === "delivering"
  );
  const completedOrders = mockOrders.filter((o) => o.status === "delivered");
  const [step, setStep] = useState<"cart" | "order" | "success">("cart");

  return (
    <div className="flex flex-col p-8 gap-6 w-133.75 h-256">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <ShoppingCart className="text-white text-sm" />
          </div>
          <h1 className="text-xl font-semibold text-white">Order detail</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/10 rounded-full border border-white w-9 h-9"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex rounded-full bg-white p gap-2">
        <div className="flex flex-2 gap-2 p-1 border-b border-gray-600">
          <Button
            className="flex-1 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full"
            onClick={() => setStep("cart")}
          >
            Cart
          </Button>
          <Button
            variant="ghost"
            className="flex-1 h-10 rounded-full border-gray-600 text-back hover:bg-red-500 hover:text-white"
            onClick={() => setStep("order")}
          >
            Order
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-200px)] overflow-y-auto">
        {completedOrders.length > 0 && (
          <div className="flex flex-col gap-5 bg-white rounded-3xl flex-1 p-6">
            <h2 className="text-lg font-semibold text-[20px] leading-7 text-black">
              Order History
            </h2>
            <div className="space-y-3">
              {completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
