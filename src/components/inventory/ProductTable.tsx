import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductTableProps {
  products?: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  isAdmin?: boolean;
}

export default function ProductTable({
  products = [],
  onEdit,
  onDelete,
  isAdmin = false,
}: ProductTableProps) {
  const groupedProducts = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, Product[]>,
  );

  return (
    <Card className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-lg">
      <div className="p-2 sm:p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-gray-200 dark:border-gray-700">
              <TableHead className="w-[100px] border-r">Categoria</TableHead>
              <TableHead className="w-[80px] border-r">Número</TableHead>
              <TableHead className="w-[80px] border-r">Medida</TableHead>
              <TableHead className="w-[80px] border-r">Polegada</TableHead>
              <TableHead className="w-[100px] border-r">Modelo</TableHead>
              <TableHead className="w-[80px] border-r">Espessura</TableHead>
              <TableHead className="w-[80px] border-r">Comp. Furo</TableHead>
              <TableHead className="w-[60px] border-r">Furo</TableHead>
              <TableHead className="text-right w-[100px] border-r">
                Valor Unit.
              </TableHead>
              <TableHead className="text-right w-[80px] border-r">
                Qtd.
              </TableHead>
              <TableHead className="text-right w-[100px] border-r">
                Valor Total
              </TableHead>
              {isAdmin && (
                <TableHead className="text-right w-[100px]">Ações</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupedProducts).map(([category, items]) => (
              <React.Fragment key={category}>
                <TableRow className="bg-gray-100 dark:bg-gray-700 border-b">
                  <TableCell colSpan={isAdmin ? 12 : 11} className="font-bold">
                    {category}
                  </TableCell>
                </TableRow>
                {items.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 border-b transition-colors duration-200"
                  >
                    <TableCell className="border-r">
                      {product.category}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.numero || "---"}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.medida || "---"}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.polegada || "---"}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.modelo || "---"}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.grossura || "---"}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.compFuro || "---"}
                    </TableCell>
                    <TableCell className="border-r">
                      {product.fields.furo || "---"}
                    </TableCell>
                    <TableCell className="text-right border-r">
                      {product.fields.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell className="text-right border-r">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-right border-r">
                      {(product.fields.valor * product.quantity).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        },
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit?.(product)}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete?.(product)}
                            className="hover:scale-110 hover:text-destructive transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
