import { useState } from "react";
import { Plus, Package, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { ProductFormDialog } from "@/components/ProductFormDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  type Product,
  type ProductFormData,
} from "@/hooks/useProducts";

export default function Index() {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = products?.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProduct.mutate(
        { ...data, id: editingProduct.id },
        { onSuccess: () => { setFormOpen(false); setEditingProduct(null); } }
      );
    } else {
      createProduct.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProduct.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
    }
  };

  const totalProducts = products?.length ?? 0;
  const inStock = products?.filter((p) => p.stock_quantity > 0).length ?? 0;
  const categories = new Set(products?.map((p) => p.category).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl gradient-primary shadow-glow flex items-center justify-center">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Manage your product inventory
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="gradient-primary shadow-glow hover:opacity-90 transition-opacity"
              onClick={() => { setEditingProduct(null); setFormOpen(true); }}
            >
              <Plus className="h-5 w-5 mr-2" /> Add Product
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
            <div className="glass-card rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Total</p>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-accent">{inStock}</p>
              <p className="text-xs text-muted-foreground mt-0.5">In Stock</p>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{categories}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Categories</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-card shadow-sm border-border/60"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
              >
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={setDeleteId}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center mb-6">
              <Sparkles className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No products yet</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
              {search ? "Try a different search term" : "Get started by adding your first product to the inventory"}
            </p>
            {!search && (
              <Button
                size="lg"
                className="gradient-primary shadow-glow"
                onClick={() => { setEditingProduct(null); setFormOpen(true); }}
              >
                <Plus className="h-5 w-5 mr-2" /> Add Your First Product
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <ProductFormDialog
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditingProduct(null); }}
        onSubmit={handleSubmit}
        product={editingProduct}
        isPending={createProduct.isPending || updateProduct.isPending}
      />
      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => { if (!open) setDeleteId(null); }}
        onConfirm={handleDeleteConfirm}
        isPending={deleteProduct.isPending}
      />
    </div>
  );
}
