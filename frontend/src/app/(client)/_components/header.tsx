import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="w-full h-16 bg-[#18181B] flex items-center justify-between pl-22 pr-22 pt-3 pb-3">
      <div className="flex gap-3 justify-center items-center">
        <img src="/misc/logo.svg" alt="logo" className="w-11.5 h-[37.29px]" />
        <div>
          <div className="flex">
            <h1 className="text-white text-[20px] font-semibold leading-7">
              Nom
            </h1>
            <h1 className="text-[#EF4444] text-[20px] font-semibold leading-7">
              Nom
            </h1>
          </div>
          <h1 className="text-white text-[12px] font-normal leading-4">
            Swift delivery
          </h1>
        </div>
      </div>
      <div className="flex gap-2">
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

        <Button variant="outline" className="w-9 h-9 rounded-full">
          <ShoppingCart />
        </Button>
        <Button
          variant="default"
          className="outline-0 w-9 h-9 bg-[#EF4444] rounded-full"
        >
          <User />
        </Button>
      </div>
    </header>
  );
}
