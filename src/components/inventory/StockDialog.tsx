import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProductCategory } from "@/lib/types";

interface StockDialogProps {
  category: ProductCategory;
  currentStock: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (category: ProductCategory, newStock: number) => void;
}

export function StockDialog({
  category,
  currentStock,
  isOpen,
  onClose,
  onUpdate,
}: StockDialogProps) {
  const [newStock, setNewStock] = useState(currentStock.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(category, parseInt(newStock));
    onClose();
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
              onChange={(e) => setNewStock(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="animate-pulse hover:animate-none">
              Atualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
