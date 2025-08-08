import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

import tomatoIcon from "@/assets/tomato-icon.png";
import wheatIcon from "@/assets/wheat-icon.png";
import appleIcon from "@/assets/apple-icon.png";
import { Link } from "react-router-dom";

// Product data moved to src/data/products.ts

const Shop = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("popularity");
  const [miniOpen, setMiniOpen] = useState(false);
  const { addItem } = useCart();

  // SEO: set title, meta description, and canonical; add JSON-LD
  useEffect(() => {
    const title = "Agriculture Products Shop – Buy Farm Supplies"; // <60 chars
    document.title = title;

    const metaDescriptionContent =
      "Shop agriculture products online: seeds, fresh produce, and farm supplies with fast delivery."; // <=160 chars

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", metaDescriptionContent);

    // Canonical tag
    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalHref = window.location.href;
    if (canonicalLink) {
      canonicalLink.href = canonicalHref;
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalHref);
      document.head.appendChild(link);
    }

    // JSON-LD structured data for a product list
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: PRODUCTS.map((p, idx) => ({
        '@type': 'Product',
        position: idx + 1,
        name: p.name,
        description: p.description,
        image: window.location.origin + p.image,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating,
          reviewCount: p.reviews,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: p.price,
          availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
    }
    switch (sort) {
      case "price_low":
        return list.sort((a, b) => a.price - b.price);
      case "price_high":
        return list.sort((a, b) => b.price - a.price);
      default:
        return list.sort((a, b) => b.reviews - a.reviews);
    }
  }, [query, category, sort]);

  const handleAddToCart = (p: Product) => {
    addItem(p, 1);
    toast.success(`${p.name} added to cart`);
    setMiniOpen(true);
  };

  const handleBuyNow = (p: Product) => {
    addItem(p, 1);
    toast.info(`Proceeding to checkout for ${p.name} (demo)`);
    setMiniOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-7xl mx-auto">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agriculture Products Shop</h1>
              <p className="text-gray-600 mt-2">Browse and buy seeds, fresh produce, and farm essentials.</p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                aria-label="Search products"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64"
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40" aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="produce">Fresh Produce</SelectItem>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="fertilizer">Fertilizers</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44" aria-label="Sort products">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>

          <section aria-label="Product listings" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
              ))}
          </section>

          <aside className="mt-10 text-center text-sm text-muted-foreground">
            Looking for something specific? <Link to="/profile" className="text-primary underline">Update your profile</Link> for personalized recommendations.
          </aside>
        </article>
      </main>
      <MiniCart open={miniOpen} onOpenChange={setMiniOpen} />
    </div>
  );
};

export default Shop;
