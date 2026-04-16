import { Package, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/hooks/useProducts";

interface Props {
  // The product data to display on the card
  product: Product;

  // Function called when the user clicks Edit
  onEdit: (product: Product) => void;

  // Function called when the user clicks Delete
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Product image section */}
      <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center overflow-hidden relative">
        {/* Show product image if one exists */}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback when there is no image */
          <div className="flex flex-col items-center gap-2">
            <Package className="h-10 w-10 text-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/30 font-medium">
              No image
            </span>
          </div>
        )}

        {/* Show badge when stock is 0 */}
        {product.stock_quantity === 0 && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="text-xs font-semibold shadow-lg">
              Out of stock
            </Badge>
          </div>
        )}
      </div>

      {/* Product details section */}
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          {/* Product name */}
          <h3 className="font-semibold text-base leading-tight line-clamp-1">
            {product.name}
          </h3>

          {/* Product price
              Important: backend returns price as a string, so we convert it
              to a number before using toFixed() to avoid runtime crashes. */}
          <span className="font-bold text-lg text-primary whitespace-nowrap">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        {/* Product description (only show if it exists) */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Category and stock badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.category && (
            <Badge variant="secondary" className="text-xs rounded-full px-3">
              {product.category}
            </Badge>
          )}

          {/* Only show stock badge if stock is greater than 0 */}
          {product.stock_quantity > 0 && (
            <Badge
              variant="outline"
              className="text-xs rounded-full px-3 border-accent/30 text-accent"
            >
              {product.stock_quantity} in stock
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 rounded-xl"
            onClick={() => onEdit(product)}
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex-1 rounded-xl"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}