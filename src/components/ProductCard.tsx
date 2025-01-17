import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  onAddToCart: (quantity: number) => void;
}

export const ProductCard = ({ id, name, price, image, stock, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${name} added to your cart`,
    });
    setQuantity(1);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-heading text-lg font-semibold">{name}</h3>
          <p className="text-primary-dark font-medium">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{stock} in stock</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary-dark"
          disabled={stock === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};