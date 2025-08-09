import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const Checkout = () => {
  const { items, total } = useCart();
  const [method, setMethod] = useState<string>("upi");
  const [stateCode, setStateCode] = useState<string>("");

  // SEO
  useEffect(() => {
    const title = "Checkout – Payment & Billing (Demo)";
    document.title = title;

    const metaDescriptionContent = "Enter billing details and preview your order. Demo payment only.";
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

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CheckoutPage",
      name: title,
      url: canonicalHref,
      isAccessibleForFree: true,
    } as const;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => { if (script && script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment successful (demo) – no real charges");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Payment & Billing</h1>
            <p className="text-muted-foreground mt-2">Demo checkout page. No real payment will be processed.</p>
          </header>

          {items.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">Your cart is empty. Add items to proceed.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handlePay} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" required placeholder="Your name" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required placeholder="you@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" required placeholder="99999 99999" />
                        </div>
                        <div>
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input id="pincode" required placeholder="560001" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="address1">Address</Label>
                          <Input id="address1" required placeholder="House number, street" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="address2">Address 2 (Optional)</Label>
                          <Input id="address2" placeholder="Area, landmark" />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required placeholder="Bengaluru" />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Select value={stateCode} onValueChange={setStateCode}>
                            <SelectTrigger id="state"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="KA">Karnataka</SelectItem>
                              <SelectItem value="MH">Maharashtra</SelectItem>
                              <SelectItem value="DL">Delhi</SelectItem>
                              <SelectItem value="TN">Tamil Nadu</SelectItem>
                              <SelectItem value="GJ">Gujarat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Payment Method</Label>
                        <div className="flex gap-3 flex-wrap">
                          <Button type="button" variant={method === "upi" ? "default" : "outline"} onClick={() => setMethod("upi")}>UPI</Button>
                          <Button type="button" variant={method === "card" ? "default" : "outline"} onClick={() => setMethod("card")}>Card</Button>
                          <Button type="button" variant={method === "cod" ? "default" : "outline"} onClick={() => setMethod("cod")}>Cash on Delivery</Button>
                        </div>
                        {method === "card" && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-3">
                              <Label htmlFor="cc-number">Card Number (Demo)</Label>
                              <Input id="cc-number" placeholder="4242 4242 4242 4242" />
                            </div>
                            <div>
                              <Label htmlFor="cc-exp">Expiry</Label>
                              <Input id="cc-exp" placeholder="12/34" />
                            </div>
                            <div>
                              <Label htmlFor="cc-cvc">CVC</Label>
                              <Input id="cc-cvc" placeholder="123" />
                            </div>
                          </div>
                        )}
                      </div>

                      <Button type="submit" className="w-full">Pay Now (Demo)</Button>
                    </form>
                  </CardContent>
                </Card>
              </section>

              <aside>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <div className="space-y-3 max-h-[40vh] overflow-auto pr-2">
                      {items.map((i) => (
                        <div key={i.id} className="flex items-center gap-3">
                          <img src={i.image} alt={`${i.name} image`} className="w-14 h-14 rounded object-contain bg-white" loading="lazy" />
                          <div className="flex-1 text-sm">
                            <div className="font-medium line-clamp-2">{i.name}</div>
                            <div className="text-muted-foreground">Qty: {i.quantity}</div>
                          </div>
                          <div className="text-sm font-semibold">{currency(i.price * i.quantity)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="font-medium">Total</span>
                      <span className="font-semibold">{currency(total)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">This is a demo payment screen. No money will be charged.</p>
                  </CardContent>
                </Card>
              </aside>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

export default Checkout;
