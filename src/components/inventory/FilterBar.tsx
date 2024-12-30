import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FilterBarProps {
  onSearch?: (term: string) => void;
  onCategoryFilter?: (category: string) => void;
  onClear?: () => void;
}

const FilterBar = ({
  onSearch = () => {},
  onCategoryFilter = () => {},
  onClear = () => {},
}: FilterBarProps) => {
  return (
    <div className="w-full bg-background border-b p-4 flex items-center gap-4 sticky top-0 z-10">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Select defaultValue="all" onValueChange={onCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            <SelectItem value="argolas">Argolas</SelectItem>
            <SelectItem value="fivelas">Fivelas</SelectItem>
            <SelectItem value="bombinhas">Bombinhas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onClear}
          title="Limpar filtros"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button variant="default" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
