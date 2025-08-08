import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export const ProductCard = ({
  product,
  onAddToCart,
  onBuyNow,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}) => {
  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img src={product.image} alt={`${product.name} - agriculture product`} loading="lazy" className="w-full h-48 object-contain bg-white" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
            <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge>{product.category}</Badge>
              {product.tags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{currency(product.price)}</div>
            <div className="text-xs text-muted-foreground">{product.stock} in stock</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">⭐ {product.rating} · {product.reviews} reviews</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onAddToCart(product)}>Add to Cart</Button>
            <Button size="sm" onClick={() => onBuyNow(product)}>Buy Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
