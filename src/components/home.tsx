import React, { useState, useEffect } from "react";
import DashboardStats from "./inventory/DashboardStats";
import ProductTable from "./inventory/ProductTable";
import ProductForm from "./inventory/ProductForm";
import FilterBar from "./inventory/FilterBar";
import { Button } from "./ui/button";
import { Plus, Moon, Sun } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useTheme } from "@/lib/theme-provider";
import { Product } from "@/lib/types";
import { Input } from "./ui/input";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/queries";
import { useToast } from "./ui/use-toast";

interface HomeProps {
  isFormOpen?: boolean;
}

export default function Home({ isFormOpen = false }: HomeProps) {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(isFormOpen);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar produtos",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === "adm123") {
      setIsAdmin(true);
      setShowLoginForm(false);
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddProduct = async (productData: any) => {
    try {
      const newProduct = {
        category: productData.category,
        fields: {
          numero: productData.numero || "",
          medida: productData.medida || "",
          polegada: productData.polegada || "",
          modelo: productData.modelo || "",
          grossura: productData.grossura || "",
          compFuro: productData.compFuro || "",
          furo: productData.furo || "",
          valor: parseFloat(productData.valor),
        },
        quantity: parseInt(productData.quantidade),
        stock: parseInt(productData.stock || "0"),
      };

      console.log("Prepared product data:", newProduct);

      if (editingProduct) {
        const updatedProduct = await updateProduct({
          ...newProduct,
          id: editingProduct.id,
        });
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? updatedProduct : p,
          ),
        );
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso",
        });
      } else {
        const addedProduct = await addProduct(newProduct);
        setProducts([...products, addedProduct]);
        toast({
          title: "Sucesso",
          description: "Produto adicionado com sucesso",
        });
      }

      setEditingProduct(null);
      setIsFormDialogOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao salvar produto",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormDialogOpen(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      setProducts(products.filter((p) => p.id !== product.id));
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao excluir produto",
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term: string, category: string) => {
    let filtered = [...products];

    if (term) {
      const searchLower = term.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase().includes(searchLower) ||
          product.fields.numero.toLowerCase().includes(searchLower) ||
          product.fields.medida.toLowerCase().includes(searchLower),
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setFilteredProducts([]);
  };

  // Calculate stats
  const stats = {
    rings: {
      quantity: products
        .filter((p) => p.category === "Argolas")
        .reduce((sum, p) => sum + p.quantity, 0),
      stock: products
        .filter((p) => p.category === "Argolas")
        .reduce((sum, p) => sum + (p.stock || 0), 0),
    },
    buckles: {
      quantity: products
        .filter((p) => p.category === "Fivelas")
        .reduce((sum, p) => sum + p.quantity, 0),
      stock: products
        .filter((p) => p.category === "Fivelas")
        .reduce((sum, p) => sum + (p.stock || 0), 0),
    },
    pumps: {
      quantity: products
        .filter((p) => p.category === "Bombinhas")
        .reduce((sum, p) => sum + p.quantity, 0),
      stock: products
        .filter((p) => p.category === "Bombinhas")
        .reduce((sum, p) => sum + (p.stock || 0), 0),
    },
    totalValue: products.reduce(
      (sum, p) => sum + p.fields.valor * p.quantity,
      0,
    ),
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background p-6">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Controle de Estoque</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {!isAdmin && !showLoginForm && (
            <Button onClick={() => setShowLoginForm(true)}>Login Admin</Button>
          )}

          {showLoginForm && (
            <div className="flex items-center gap-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <Button onClick={handleLogin}>Entrar</Button>
            </div>
          )}

          {isAdmin && (
            <>
              <Dialog
                open={isFormDialogOpen}
                onOpenChange={setIsFormDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[400px] p-0">
                  <ProductForm
                    onSubmit={handleAddProduct}
                    onCancel={() => {
                      setIsFormDialogOpen(false);
                      setEditingProduct(null);
                    }}
                    initialData={editingProduct}
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </>
          )}
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="space-y-4">
        <FilterBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onClear={clearFilters}
        />
        <ProductTable
          products={filteredProducts.length > 0 ? filteredProducts : products}
          isAdmin={isAdmin}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
