import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";

// Mock data - replace with real data later
const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Organic Apples",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    stock: 50,
  },
  {
    id: 2,
    name: "Whole Grain Bread",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    stock: 30,
  },
  {
    id: 3,
    name: "Farm Fresh Eggs",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
    stock: 100,
  },
  {
    id: 4,
    name: "Organic Milk",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    stock: 40,
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: number, quantity: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-heading text-2xl font-bold text-primary-dark">
            Fresh Market
          </h1>
          <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} />
        </div>
      </header>

      <main className="container py-8">
        <h2 className="mb-8 font-heading text-3xl font-bold">Featured Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={(quantity) => handleAddToCart(product.id, quantity)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;