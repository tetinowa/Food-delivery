"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-[535px] bg-[#404040] p-8 gap-6 rounded-l-[20px] border-0"
      >
        <SheetHeader className="p-0 flex ">
          <SheetTitle>
            <div className="flex text-white gap-3 items-center flex-col items-start">
              <div className="flex gap-3 items-center">
                <ShoppingCartIcon />
                <h1>Order detail</h1>
              </div>
              <div className="w-[500px] flex items-center rounded-full p-1 gap-1 bg-white">
                <Button
                  variant={"ghost"}
                  className="w-1/2 bg-[#18181B] text-white rounded-full bg-[#EF4444]"
                >
                  Cart
                </Button>
                <Button variant={"secondary"} className="w-1/2 rounded-full">
                  Cart
                </Button>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="w-full bg-white flex flex-col rounded-[20px] gap-4">
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <p className="text-lg mb-4">Your cart is empty</p>
                <ShoppingCartIcon className="w-12 h-12" />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600 space-y-4">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent text-white border-white hover:bg-white/10"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => onOpenChange(false)}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#18181B] rounded-lg p-4 flex gap-4"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-white w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600 space-y-4">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent text-white border-white hover:bg-white/10"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => onOpenChange(false)}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
