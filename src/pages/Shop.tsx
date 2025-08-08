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

// Simple mock products (could be moved to a separate data file if needed)
const ALL_PRODUCTS = [
  {
    id: "p1",
    name: "Organic Tomatoes (1kg)",
    price: 120,
    image: tomatoIcon,
    rating: 4.6,
    reviews: 128,
    stock: 34,
    category: "produce",
    tags: ["fresh", "organic"],
    description: "Freshly picked organic tomatoes from certified farms.",
  },
  {
    id: "p2",
    name: "Premium Wheat Seeds (5kg)",
    price: 899,
    image: wheatIcon,
    rating: 4.4,
    reviews: 76,
    stock: 52,
    category: "seeds",
    tags: ["high yield", "drought tolerant"],
    description: "High-germination wheat seed variety for excellent yield.",
  },
  {
    id: "p3",
    name: "Farm Fresh Apples (1kg)",
    price: 160,
    image: appleIcon,
    rating: 4.8,
    reviews: 210,
    stock: 18,
    category: "produce",
    tags: ["juicy", "sweet"],
    description: "Crisp and sweet apples sourced from hillside orchards.",
  },
];

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const Shop = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("popularity");

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
      itemListElement: ALL_PRODUCTS.map((p, idx) => ({
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
    let list = [...ALL_PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
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

  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart (demo)`);
  };

  const handleBuyNow = (name: string) => {
    toast.info(`Proceeding to checkout for ${name} (demo)`);
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
              <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <img
                    src={p.image}
                    alt={`${p.name} - agriculture product`}
                    loading="lazy"
                    className="w-full h-48 object-contain bg-white"
                  />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg leading-tight">{p.name}</CardTitle>
                      <div className="mt-1 text-sm text-muted-foreground">{p.description}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge>{p.category}</Badge>
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold text-gray-900">{currency(p.price)}</div>
                      <div className="text-xs text-muted-foreground">{p.stock} in stock</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">⭐ {p.rating} · {p.reviews} reviews</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleAddToCart(p.name)}>
                        Add to Cart
                      </Button>
                      <Button size="sm" onClick={() => handleBuyNow(p.name)}>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <aside className="mt-10 text-center text-sm text-muted-foreground">
            Looking for something specific? <Link to="/profile" className="text-primary underline">Update your profile</Link> for personalized recommendations.
          </aside>
        </article>
      </main>
    </div>
  );
};

export default Shop;
