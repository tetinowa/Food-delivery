import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartItem({
  id,
  name,
  description,
  price,
  imageSrc,
  quantity,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="flex gap-3 pb-4 border-b border-dashed border-gray-200">
      <Image
        src={imageSrc}
        alt={name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-red-500">{name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-500 h-6 w-6 shrink-0"
            onClick={() => onRemove(id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              className="hover:text-red-500"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-sm font-medium w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              className="hover:text-red-500"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <p className="font-bold text-base text-black">
            ${(price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
