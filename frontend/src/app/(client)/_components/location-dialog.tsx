"use client";

import { ChevronRight, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthProvider";
import { useState, useEffect } from "react";

export function LocationDialog() {
  const { user, updateAddress } = useAuth();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(user?.address || "");

  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user?.address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    const success = await updateAddress(address);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-[#EF4444] text-[12px] flex items-center gap rounded-full"
        >
          <MapPin />
          <p>Delivery Address:</p>
          <div className="text-[#71717A] flex items-center gap">
            <p>{user?.address || "Add location"}</p>
            <ChevronRight className="w-5 h-5" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Please write your delivery address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Input
                id="location"
                name="location"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Please share your complete address"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Deliver Here</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
