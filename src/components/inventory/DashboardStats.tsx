import React from "react";
import { Card } from "@/components/ui/card";
import { Package, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  stock?: number;
  icon?: React.ReactNode;
  isCurrency?: boolean;
}

const StatCard = ({
  title = "Stat",
  value = 0,
  stock,
  icon = <Package className="h-4 w-4" />,
  isCurrency = false,
}: StatCardProps) => {
  const displayValue = isCurrency
    ? Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : value;

  return (
    <Card className="p-6 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Quantidade:
          </span>
          <span className="text-lg font-bold">{displayValue}</span>
        </div>
        {typeof stock !== "undefined" && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Estoque:
            </span>
            <span className="text-lg font-bold">{stock}</span>
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
}

const DashboardStats = ({
  stats = {
    rings: { quantity: 0, stock: 0 },
    buckles: { quantity: 0, stock: 0 },
    pumps: { quantity: 0, stock: 0 },
    totalValue: 0,
  },
}: DashboardStatsProps) => {
  return (
    <div className="w-full p-6 bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Argolas"
          value={stats.rings.quantity}
          stock={stats.rings.stock}
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard
          title="Fivelas"
          value={stats.buckles.quantity}
          stock={stats.buckles.stock}
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard
          title="Bombinhas"
          value={stats.pumps.quantity}
          stock={stats.pumps.stock}
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard
          title="Valor Total"
          value={stats.totalValue}
          icon={<DollarSign className="h-4 w-4 text-green-500" />}
          isCurrency={true}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
