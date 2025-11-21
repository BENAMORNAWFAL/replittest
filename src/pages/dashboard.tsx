import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/ProductCard";
import ProductDialog from "@/components/ProductDialog";
import DeleteDialog from "@/components/DeleteDialog";
import { Plus, LogOut, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import burgerImage from "@assets/generated_images/gourmet_burger_product_photo.png";
import pastaImage from "@assets/generated_images/pasta_carbonara_product_photo.png";
import saladImage from "@assets/generated_images/greek_salad_product_photo.png";
import salmonImage from "@assets/generated_images/grilled_salmon_product_photo.png";

// TODO: Remove mock data - replace with actual API calls
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Gourmet Burger",
    description:
      "Juicy beef patty with crispy bacon, melted cheese, fresh lettuce and tomato on a toasted sesame bun",
    price: 12.99,
    image: burgerImage,
  },
  {
    id: "2",
    name: "Pasta Carbonara",
    description:
      "Creamy Italian pasta with crispy bacon, parmesan cheese, and black pepper",
    price: 14.99,
    image: pastaImage,
  },
  {
    id: "3",
    name: "Greek Salad",
    description:
      "Fresh tomatoes, cucumbers, olives, feta cheese with olive oil dressing",
    price: 9.99,
    image: saladImage,
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon grilled to perfection with herbs and roasted vegetables",
    price: 18.99,
    image: salmonImage,
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts); // TODO: Remove mock functionality
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleSaveProduct = (
    productData: Omit<Product, "id"> & { id?: string }
  ) => {
    if (productData.id) {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productData.id ? { ...productData, id: productData.id } : p
        )
      );
      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      });
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
      } as Product;
      setProducts((prev) => [...prev, newProduct]);
      toast({
        title: "Product added",
        description: "Your new product has been added successfully.",
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      toast({
        title: "Product deleted",
        description: `${selectedProduct.name} has been removed from your menu.`,
      });
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been signed out successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
              <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold">
                Restaurant Manager
              </h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold">Menu Products</h2>
            <p className="text-muted-foreground mt-1">
              Manage your restaurant menu items
            </p>
          </div>
          <Button
            onClick={handleAddProduct}
            size="lg"
            data-testid="button-add-product"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first menu item
            </p>
            <Button
              onClick={handleAddProduct}
              data-testid="button-add-first-product"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <ProductDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        product={selectedProduct}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
