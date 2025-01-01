import React from "react";
import { Card } from "@/components/ui/card";
import { Package, DollarSign, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface StatCardProps {
  title: string;
  value: number | string;
  stock?: number;
  icon?: React.ReactNode;
  isCurrency?: boolean;
  onUpdateStock?: () => void;
  showStockButton?: boolean;
  showStock?: boolean;
}

const StatCard = ({
  title = "Stat",
  value = 0,
  stock = 0,
  icon = <Package className="h-4 w-4" />,
  isCurrency = false,
  onUpdateStock,
  showStockButton = false,
  showStock = true,
}: StatCardProps) => {
  const displayValue = isCurrency
    ? Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : value;

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
        </div>
        {showStockButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={onUpdateStock}
            className="hover:scale-105 transition-transform"
          >
            Atualizar Estoque
          </Button>
        )}
      </div>
      <div className="mt-4 space-y-1">
        {showStock ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Quantidade:
              </span>
              <span className="text-lg font-bold">{displayValue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Estoque:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{stock}</span>
                {stock === 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Estoque zerado</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">{displayValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

interface DashboardStatsProps {
  stats?: {
    rings: { quantity: number; stock: number };
    buckles: { quantity: number; stock: number };
    pumps: { quantity: number; stock: number };
    totalValue: number;
  };
  isAdmin?: boolean;
  onUpdateStock?: (category: string) => void;
}

const DashboardStats = ({
  stats = {
    rings: { quantity: 0, stock: 0 },
    buckles: { quantity: 0, stock: 0 },
    pumps: { quantity: 0, stock: 0 },
    totalValue: 0,
  },
  isAdmin = false,
  onUpdateStock,
}: DashboardStatsProps) => {
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Argolas"
          value={stats.rings.quantity}
          stock={stats.rings.stock}
          icon={<Package className="h-4 w-4" />}
          showStockButton={isAdmin}
          onUpdateStock={() => onUpdateStock?.("Argolas")}
        />
        <StatCard
          title="Fivelas"
          value={stats.buckles.quantity}
          stock={stats.buckles.stock}
          icon={<Package className="h-4 w-4" />}
          showStockButton={isAdmin}
          onUpdateStock={() => onUpdateStock?.("Fivelas")}
        />
        <StatCard
          title="Bombinhas"
          value={stats.pumps.quantity}
          stock={stats.pumps.stock}
          icon={<Package className="h-4 w-4" />}
          showStockButton={isAdmin}
          onUpdateStock={() => onUpdateStock?.("Bombinhas")}
        />
        <StatCard
          title="Valor Total"
          value={stats.totalValue}
          icon={<DollarSign className="h-4 w-4 text-green-500" />}
          isCurrency={true}
          showStock={false}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
