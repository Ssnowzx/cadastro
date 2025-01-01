import React, { useState, useEffect } from "react";
import DashboardStats from "./inventory/DashboardStats";
import ProductTable from "./inventory/ProductTable";
import ProductForm from "./inventory/ProductForm";
import FilterBar from "./inventory/FilterBar";
import { Button } from "./ui/button";
import { Plus, Moon, Sun } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useTheme } from "@/lib/theme-provider";
import { Product, ProductFormData, ProductCategory } from "@/lib/types";
import { Input } from "./ui/input";
import { StockDialog } from "./inventory/StockDialog";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchCategoryStocks,
  updateCategoryStock,
  getCategoryStock,
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
  const [selectedCategoryForStock, setSelectedCategoryForStock] =
    useState<ProductCategory | null>(null);
  const [categoryStocks, setCategoryStocks] = useState<{
    [key: string]: number;
  }>({});
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [productsData, stocksData] = await Promise.all([
        fetchProducts(),
        fetchCategoryStocks(),
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);

      const stocksMap = stocksData.reduce(
        (acc, stock) => {
          acc[stock.category] = stock.stock;
          return acc;
        },
        {} as { [key: string]: number },
      );
      setCategoryStocks(stocksMap);
    } catch (error) {
      console.error("Error loading initial data:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar dados",
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

  const handleAddProduct = async (productData: ProductFormData) => {
    try {
      const currentStock = await getCategoryStock(productData.category);

      if (currentStock < productData.quantity) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: `Estoque insuficiente para categoria ${productData.category}. Estoque atual: ${currentStock}`,
        });
        return;
      }

      if (editingProduct) {
        const updatedProduct = await updateProduct({
          ...editingProduct,
          category: productData.category,
          fields: productData.fields,
          quantity: productData.quantity,
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
        const addedProduct = await addProduct(productData);
        setProducts([...products, addedProduct]);
        toast({
          title: "Sucesso",
          description: "Produto adicionado com sucesso",
        });
      }

      setEditingProduct(null);
      setIsFormDialogOpen(false);
      await loadInitialData();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro ao salvar produto",
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
      await loadInitialData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao excluir produto",
      });
    }
  };

  const handleUpdateStock = async (
    category: ProductCategory,
    newStock: number,
  ) => {
    try {
      await updateCategoryStock(category, newStock);
      await loadInitialData();
      toast({
        title: "Sucesso",
        description: "Estoque atualizado com sucesso",
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar estoque",
      });
    }
  };

  const handleCategoryStockUpdate = (category: string) => {
    setSelectedCategoryForStock(category as ProductCategory);
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

  const stats = {
    rings: {
      quantity: products
        .filter((p) => p.category === "Argolas")
        .reduce((sum, p) => sum + p.quantity, 0),
      stock: categoryStocks["Argolas"] || 0,
    },
    buckles: {
      quantity: products
        .filter((p) => p.category === "Fivelas")
        .reduce((sum, p) => sum + p.quantity, 0),
      stock: categoryStocks["Fivelas"] || 0,
    },
    pumps: {
      quantity: products
        .filter((p) => p.category === "Bombinhas")
        .reduce((sum, p) => sum + p.quantity, 0),
      stock: categoryStocks["Bombinhas"] || 0,
    },
    totalValue: products.reduce(
      (sum, p) => sum + p.fields.valor * p.quantity,
      0,
    ),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">Carregando...</div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Controle de Estoque</h1>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:scale-110 transition-transform"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {!isAdmin && !showLoginForm && (
            <Button
              onClick={() => setShowLoginForm(true)}
              className="hover:scale-105 transition-transform"
            >
              Login Admin
            </Button>
          )}

          {showLoginForm && (
            <div className="flex items-center gap-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleLogin}
                className="hover:scale-105 transition-transform"
              >
                Entrar
              </Button>
            </div>
          )}

          {isAdmin && (
            <>
              <Dialog
                open={isFormDialogOpen}
                onOpenChange={setIsFormDialogOpen}
              >
                <Button
                  className="gap-2 hover:scale-105 transition-transform"
                  onClick={() => setIsFormDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Novo Produto
                </Button>
                <DialogContent>
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
              <Button
                variant="outline"
                onClick={handleLogout}
                className="hover:scale-105 transition-transform"
              >
                Sair
              </Button>
            </>
          )}
        </div>
      </div>

      <DashboardStats
        stats={stats}
        isAdmin={isAdmin}
        onUpdateStock={handleCategoryStockUpdate}
      />

      <div className="space-y-4">
        <FilterBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />
        <ProductTable
          products={filteredProducts.length > 0 ? filteredProducts : products}
          isAdmin={isAdmin}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {selectedCategoryForStock && (
        <StockDialog
          category={selectedCategoryForStock}
          currentStock={categoryStocks[selectedCategoryForStock] || 0}
          isOpen={!!selectedCategoryForStock}
          onClose={() => setSelectedCategoryForStock(null)}
          onUpdate={handleUpdateStock}
        />
      )}
    </div>
  );
}
