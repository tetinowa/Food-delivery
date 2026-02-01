import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  X,
  ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { api } from "@/lib/axios";

interface OrderItem {
  foodId: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  deliveryAddress: string;
  status: "Pending" | "Delivered" | "Cancelled";
  createdAt: string;
}

interface CartOrderProps {
  onBack: () => void;
  onSubmit: () => void;
  userId?: string;
}

const statusConfig = {
  Pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  Delivered: {
    label: "Delivered",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  Cancelled: {
    label: "Cancelled",
    icon: X,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
};

function formatTimeAgo(date: string): string {
  const now = new Date();
  const orderDate = new Date(date);
  const diffMs = now.getTime() - orderDate.getTime();
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
        <div className="flex gap-8 items-center text-black font-bold text-[16px]">
          <span>${order.totalPrice.toFixed(2)}</span>
          <span>#{order._id.slice(-6)}</span>
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
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-700">{item.quantity}x Food Item</span>
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
          ${order.totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export function CartOrder({ onBack, userId }: CartOrderProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`/orders?userId=${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const activeOrders = orders.filter((o) => o.status === "Pending");
  const completedOrders = orders.filter((o) => o.status === "Delivered");

  const submitOrder = async (userId: string, address: string) => {
    const orderData = {
      userId,
      items: items.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
      deliveryAddress: address,
    };

    const response = await api.post("/orders/create", orderData);
    clearCart();
    setOrders([response.data, ...orders]);
    return response.data;
  };

  if (loading) {
    return <div className="text-white p-8">Loading orders...</div>;
  }

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

      <div className="flex flex-col gap-4 min-h-[calc(100vh-200px)] overflow-y-auto">
        {activeOrders.length > 0 && (
          <div className="flex flex-col gap-5 bg-white rounded-3xl flex-1 p-6">
            <h2 className="text-lg font-semibold text-[20px] leading-7 text-black">
              Active Orders
            </h2>
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        )}

        {completedOrders.length > 0 && (
          <div className="flex flex-col gap-5 bg-white rounded-3xl flex-1 p-6">
            <h2 className="text-lg font-semibold text-[20px] leading-7 text-black">
              Order History
            </h2>
            <div className="space-y-3">
              {completedOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <Package className="w-16 h-16 opacity-50" />
            <p className="text-lg">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
