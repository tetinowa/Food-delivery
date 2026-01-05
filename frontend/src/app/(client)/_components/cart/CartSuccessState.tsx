import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface CartSuccessStateProps {
  onClose: () => void;
  onClearCart: () => void;
}

export function CartSuccessState({
  onClose,
  onClearCart,
}: CartSuccessStateProps) {
  return (
    <div className=" h-full flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-black">
          Success order
        </h2>
        <p className="text-gray-500 mb-2">Enjoy your food!</p>
        <p className="text-sm text-gray-500 mb-6">Your order is on the way</p>
        <Button
          className="bg-black text-white hover:bg-black/90"
          onClick={() => {
            onClearCart();
            onClose();
          }}
        >
          Track Order
        </Button>
      </div>
    </div>
  );
}
