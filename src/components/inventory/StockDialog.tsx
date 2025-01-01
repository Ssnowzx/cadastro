import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProductCategory } from "@/lib/types";

interface StockDialogProps {
  category: ProductCategory;
  currentStock: number;
  currentQuantity: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (category: ProductCategory, newStock: number) => void;
}

export function StockDialog({
  category,
  currentStock,
  currentQuantity,
  isOpen,
  onClose,
  onUpdate,
}: StockDialogProps) {
  const [newStock, setNewStock] = useState(currentStock.toString());
  const [error, setError] = useState("");

  useEffect(() => {
    setNewStock(currentStock.toString());
  }, [currentStock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stockValue = parseInt(newStock);

    if (stockValue < currentQuantity) {
      setError(
        `O estoque não pode ser menor que a quantidade total de produtos (${currentQuantity})`,
      );
      return;
    }

    setError("");
    onUpdate(category, stockValue);
    onClose();
  };

  const handleStockChange = (value: string) => {
    setNewStock(value);
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar Estoque</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <div className="text-sm text-gray-500">{category}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Quantidade em Estoque</Label>
            <Input
              id="stock"
              type="number"
              value={newStock}
              onChange={(e) => handleStockChange(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              min={currentQuantity}
            />
            {error && <div className="text-sm text-red-500">{error}</div>}
            <div className="text-sm text-gray-500">
              Quantidade atual de produtos: {currentQuantity}
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="animate-pulse hover:animate-none"
              disabled={!!error}
            >
              Atualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
