import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ShoppingCart, User } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useCart } from "@/contexts/cart-context";
import { LocationDialog } from "./location-dialog";
import { CartDialog } from "./cart-dialog";
import { Logo } from "./logo";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export function Header() {
  const { totalItems } = useCart();
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const handleCartClick = () => {
    setIsCartDialogOpen(true);
  };
  const { user } = useAuth();

  return (
    <header className="w-full h-16 bg-[#18181B] flex items-center justify-between pl-22 pr-22 pt-3 pb-3">
      <div className="flex gap-2">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <LocationDialog />
        <Button
          variant="outline"
          className="w-9 h-9 rounded-full relative"
          onClick={handleCartClick}
        >
          <ShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
        <CartDialog
          open={isCartDialogOpen}
          onOpenChange={setIsCartDialogOpen}
        />
        {user ? (
          <UserAvatar name={user.name} />
        ) : (
          <Button
            variant="default"
            className="outline-0 w-9 h-9 bg-[#EF4444] rounded-full"
          >
            <User />
          </Button>
        )}
      </div>
    </header>
  );
}
