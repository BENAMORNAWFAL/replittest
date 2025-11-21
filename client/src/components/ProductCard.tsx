import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold text-lg line-clamp-1"
              data-testid={`text-product-name-${product.id}`}
            >
              {product.name}
            </h3>
            <p
              className="font-bold text-xl text-primary shrink-0"
              data-testid={`text-product-price-${product.id}`}
            >
              ${product.price.toFixed(2)}
            </p>
          </div>
          <p
            className="text-sm text-muted-foreground line-clamp-2"
            data-testid={`text-product-description-${product.id}`}
          >
            {product.description}
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(product)}
              data-testid={`button-edit-${product.id}`}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(product)}
              data-testid={`button-delete-${product.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
