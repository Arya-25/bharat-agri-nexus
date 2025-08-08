import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

export const MiniCart = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const { items, total, count } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Added to Cart</SheetTitle>
          <p className="text-sm text-muted-foreground">You have {count} item{count !== 1 ? "s" : ""} in your cart.</p>
        </SheetHeader>
        <div className="mt-4 space-y-4 overflow-y-auto max-h-[60vh] pr-2">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-3">
              <img src={i.image} alt={i.name} className="w-14 h-14 rounded-md object-contain bg-white" loading="lazy" />
              <div className="flex-1">
                <div className="text-sm font-medium line-clamp-2">{i.name}</div>
                <div className="text-xs text-muted-foreground">Qty: {i.quantity}</div>
              </div>
              <div className="text-sm font-semibold">₹{(i.price * i.quantity).toLocaleString("en-IN")}</div>
            </div>
          ))}
          {items.length === 0 && <div className="text-sm text-muted-foreground">Your cart is empty.</div>}
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="text-base font-semibold">Subtotal</div>
          <div className="text-base font-semibold">₹{total.toLocaleString("en-IN")}</div>
        </div>
        <SheetFooter className="mt-4">
          <Link to="/cart" className="w-full" onClick={() => onOpenChange(false)}>
            <Button className="w-full">Go to Cart</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MiniCart;
