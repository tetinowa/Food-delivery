"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex justify-end">
        <DialogContent className="sm:max-w-[826px] sm:max-h-[412px] bg-[#404040] flex p-8 gap-6 items-center justify-center">
          <DialogHeader>
            <DialogTitle>Cart</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
}
