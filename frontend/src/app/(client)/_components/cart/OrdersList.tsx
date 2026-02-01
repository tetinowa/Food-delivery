import { useState, useEffect } from "react";
import { Package, Clock, X } from "lucide-react";
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

interface OrdersListProps {
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
    <div className="flex flex-col px-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center text-black font-bold text-sm">
          <span>${order.totalPrice.toFixed(2)}</span>
          <span className="text-gray-500 font-normal">#{order._id.slice(-6)}</span>
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
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">
          {formatTimeAgo(order.createdAt)}
        </span>
        <span className="text-xs text-gray-500">
          {order.items.length} item{order.items.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

export function OrdersList({ userId }: OrdersListProps) {
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

  if (loading) {
    return <div className="text-gray-500 text-center py-4">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <Package className="w-12 h-12 mb-2" />
        <p>No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
