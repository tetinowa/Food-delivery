import { Button } from "@/components/ui/button";

interface CartEmptyStateProps {
  onClose: () => void;
}

export function CartEmptyState({ onClose }: CartEmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="text-6xl">🛒</div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-black">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add items to get started</p>
        <Button className="bg-black text-white hover:bg-black/90" onClick={onClose}>
          Browse Menu
        </Button>
      </div>
    </div>
  );
}
