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

export function LocationDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-[#EF4444] text-[12px] flex items-center gap rounded-full"
          >
            <MapPin />
            <p>Delivery Address:</p>
            <div className="text-[#71717A] flex items-center gap">
              <p>Add location</p>
              <ChevronRight className="w-5 h-5" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Please write your delivery address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input
                id="location"
                name="location"
                placeholder="Please share your complete address"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Deliver Here</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
