import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, type Product } from "@/data/products";
import MiniCart from "@/components/shop/MiniCart";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const CartPage = () => {
  const [open, setOpen] = useState(false);
  const { items, total, updateQty, removeItem, clear } = useCart();

  useEffect(() => {
    const title = "Your Cart – Agri Products Checkout";
    document.title = title;

    const metaDescriptionContent = "View your cart items and proceed to checkout for agriculture products.";
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", metaDescriptionContent);

    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalHref = window.location.href;
    if (canonicalLink) canonicalLink.href = canonicalHref; else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalHref);
      document.head.appendChild(link);
    }
  }, []);

  const handleCheckout = () => {
    toast.success("Proceeding to checkout (demo)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <p className="text-muted-foreground mt-2">Review items and complete your purchase.</p>
          </header>

          {items.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">Your cart is empty.</p>
                <Link to="/shop" className="inline-block mt-4">
                  <Button>Go to Shop</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 space-y-4">
                {items.map((i) => (
                  <Card key={i.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <img src={i.image} alt={i.name} className="w-20 h-20 object-contain bg-white rounded" />
                      <div className="flex-1">
                        <div className="font-medium">{i.name}</div>
                        <div className="text-sm text-muted-foreground">Price: {currency(i.price)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => updateQty(i.id, i.quantity - 1)}>-</Button>
                        <Input type="number" className="w-16 text-center" value={i.quantity}
                          onChange={(e) => updateQty(i.id, Number(e.target.value) || 1)} min={1} max={99} />
                        <Button variant="outline" size="icon" onClick={() => updateQty(i.id, i.quantity + 1)}>+</Button>
                      </div>
                      <div className="w-28 text-right font-semibold">{currency(i.price * i.quantity)}</div>
                      <Button variant="ghost" onClick={() => removeItem(i.id)}>Remove</Button>
                    </CardContent>
                  </Card>
                ))}
                <div>
                  <Button variant="secondary" onClick={() => clear()}>Clear Cart</Button>
                </div>
              </section>

              <aside>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{currency(total)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Taxes and shipping are calculated at checkout.</p>
                    <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                    <Button className="w-full" variant="outline" onClick={() => setOpen(true)}>Quick View</Button>
                  </CardContent>
                </Card>
              </aside>
            </div>
          )}
        </article>
      </main>
      <MiniCart open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default CartPage;
