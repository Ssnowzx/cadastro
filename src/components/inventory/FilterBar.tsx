import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
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
}

const FilterBar = ({
  onSearch = () => {},
  onCategoryFilter = () => {},
}: FilterBarProps) => {
  return (
    <div className="w-full bg-background border-b p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 sticky top-0 z-10">
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-10 w-full transition-all duration-200 focus:ring-2 focus:ring-primary"
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
    </div>
  );
};

export default FilterBar;
