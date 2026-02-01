import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSuccessStateProps {
  onClose: () => void;
  onViewOrders: () => void;
  orderItems: OrderItem[];
  totalPrice: number;
  deliveryAddress: string;
}

export function CartSuccessState({
  onClose,
  onViewOrders,
  orderItems,
  totalPrice,
  deliveryAddress,
}: CartSuccessStateProps) {
  const deliveryFee = 0.99;

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-black">Order Placed!</h2>
        <p className="text-gray-500">Your order is on the way</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h3 className="font-semibold text-black mb-3">Order Summary</h3>
        <div className="space-y-2">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${(totalPrice - deliveryFee).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-black pt-1">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-black mb-2">Delivery Address</h3>
        <p className="text-sm text-gray-600">{deliveryAddress}</p>
      </div>

      <div className="mt-auto space-y-3">
        <Button
          className="w-full bg-red-500 text-white hover:bg-red-600"
          onClick={onViewOrders}
        >
          View Orders
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={onClose}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
