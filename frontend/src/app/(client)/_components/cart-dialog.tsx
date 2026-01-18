"use client";

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCartIcon, X } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { CartEmptyState } from "./cart/CartEmptyState";
import { CartSuccessState } from "./cart/CartSuccessState";
import { CartAddressForm } from "./cart/CartAddressForm";
import { CartItem } from "./cart/CartItem";
import { RemoveItemDialog } from "./cart/RemoveItemDialog";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();
  const [step, setStep] = useState<"cart" | "address" | "success">("cart");
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const deliveryFee = 0.99;
  const total = totalPrice + deliveryFee;

  const handleClose = () => {
    setStep("cart");
    onOpenChange(false);
  };

  const confirmRemoveItem = (id: string) => {
    setItemToRemove(id);
    setShowRemoveDialog(true);
  };

  const handleRemoveItem = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setShowRemoveDialog(false);
      setItemToRemove(null);
    }
  };

  const renderContent = () => {
    if (items.length === 0 && step === "cart") {
      return <CartEmptyState onClose={handleClose} />;
    }

    if (step === "success") {
      return <CartSuccessState onClose={handleClose} onClearCart={clearCart} />;
    }

    if (step === "address") {
      return (
        <CartAddressForm
          onBack={() => setStep("cart")}
          onSubmit={() => setStep("success")}
        />
      );
    }

    return (
      <>
        <RemoveItemDialog
          open={showRemoveDialog}
          onCancel={() => setShowRemoveDialog(false)}
          onConfirm={handleRemoveItem}
        />
        <div className="">
          <div className="flex flex-col p-8 gap-6 w-133.75 h-256">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded flex items-center justify-center">
                  <ShoppingCartIcon className="text-white text-sm" />
                </div>
                <h1 className="text-xl font-semibold text-white">
                  Order detail
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/10 rounded-full border border-white w-9 h-9"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex rounded-full bg-white p gap-2">
              <div className="flex flex-2 gap-2 p-1 border-b border-gray-600">
                <Button className="flex-1 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full">
                  Cart
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 h-10 rounded-full border-gray-600 text-back hover:bg-red-500 hover:text-white"
                >
                  Order
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-black">My cart</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onRemove={confirmRemoveItem}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-black">
                  Delivery location
                </h3>
                <Input
                  placeholder="Please share your complete address"
                  className="h-12 bg-gray-100 border-gray-200"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <h3 className="font-semibold mb-3 text-black">Payment info</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items</span>
                  <span className="font-semibold text-black">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-black">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-black">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full"
                onClick={() => setStep("address")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-133.75 w-full bg-[#404040] p-0 border-0"
      >
        {renderContent()}
      </SheetContent>
    </Sheet>
  );
}
