"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export function CartDialog() {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[826px] sm:max-h-[412px] flex p-6 gap-6 items-center justify-center">
        <div>Cart Dialog Content</div>
      </DialogContent>
    </Dialog>
  );
}
