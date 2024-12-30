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
import { Separator } from "../ui/separator";

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
    <Card className="w-full h-[600px] overflow-auto bg-white dark:bg-gray-800 p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-gray-200 dark:border-gray-700">
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Categoria
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Número
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Medida
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Polegada
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Modelo
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Espessura
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Comp. Furo
            </TableHead>
            <TableHead className="border-r border-gray-200 dark:border-gray-600">
              Furo
            </TableHead>
            <TableHead className="text-right border-r border-gray-200 dark:border-gray-600">
              Valor Unit.
            </TableHead>
            <TableHead className="text-right border-r border-gray-200 dark:border-gray-600">
              Quantidade
            </TableHead>
            <TableHead className="text-right border-r border-gray-200 dark:border-gray-600">
              Estoque
            </TableHead>
            <TableHead className="text-right border-r border-gray-200 dark:border-gray-600">
              Valor Total
            </TableHead>
            {isAdmin && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedProducts).map(([category, items], index) => (
            <React.Fragment key={category}>
              <TableRow className="bg-gray-100 dark:bg-gray-700 border-t-2 border-gray-300 dark:border-gray-600">
                <TableCell colSpan={isAdmin ? 13 : 12} className="font-bold">
                  {category}
                </TableCell>
              </TableRow>
              {items.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-700"
                >
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.category}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.numero}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.medida}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.polegada}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.modelo || "-"}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.grossura || "-"}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.compFuro || "-"}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-600">
                    {product.fields.furo || "-"}
                  </TableCell>
                  <TableCell className="text-right border-r border-gray-200 dark:border-gray-600">
                    {product.fields.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right border-r border-gray-200 dark:border-gray-600">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right border-r border-gray-200 dark:border-gray-600">
                    {product.stock || 0}
                  </TableCell>
                  <TableCell className="text-right border-r border-gray-200 dark:border-gray-600">
                    {(product.fields.valor * product.quantity).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      },
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit?.(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete?.(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={isAdmin ? 13 : 12}>
                  <Separator className="my-2" />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
