import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface RemoveItemDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function RemoveItemDialog({ open, onCancel, onConfirm }: RemoveItemDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <Trash2 className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-semibold text-center mb-3 text-black">
          Are you sure you want to remove this item?
        </h3>
        <p className="text-gray-500 text-center mb-8">
          This item will be removed from your cart.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-14 text-base" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="flex-1 h-14 bg-red-500 hover:bg-red-600 text-white text-base"
            onClick={onConfirm}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
