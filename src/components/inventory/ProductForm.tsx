import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ProductCategory, optionsMap, Product } from "@/lib/types";
import { useToast } from "../ui/use-toast";

interface ProductFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  isOpen?: boolean;
  initialData?: Product | null;
}

const ProductForm = ({
  onSubmit = () => {},
  onCancel = () => {},
  isOpen = true,
  initialData = null,
}: ProductFormProps) => {
  const { toast } = useToast();
  const [category, setCategory] = useState<ProductCategory>("Argolas");
  const [fields, setFields] = useState({
    numero: "",
    medida: "",
    polegada: "",
    modelo: "",
    grossura: "",
    compFuro: "",
    furo: "",
    valor: "",
    quantidade: "",
    stock: "",
  });

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setFields({
        numero: initialData.fields.numero || "",
        medida: initialData.fields.medida || "",
        polegada: initialData.fields.polegada || "",
        modelo: initialData.fields.modelo || "",
        grossura: initialData.fields.grossura || "",
        compFuro: initialData.fields.compFuro || "",
        furo: initialData.fields.furo || "",
        valor: initialData.fields.valor.toString(),
        quantidade: initialData.quantity.toString(),
        stock: initialData.stock?.toString() || "0",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const validateFields = () => {
    const requiredFields = {
      valor: "Valor Unitário",
      quantidade: "Quantidade",
      stock: "Estoque",
    };

    if (category !== "Bombinhas") {
      Object.assign(requiredFields, {
        numero: "Número",
        medida: "Medida",
        polegada: "Polegada",
        modelo: "Modelo",
        grossura: "Espessura",
      });
    } else {
      Object.assign(requiredFields, {
        compFuro: "Comprimento do Furo",
        furo: "Furo",
      });
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!fields[field]) {
        toast({
          variant: "destructive",
          title: "Campo obrigatório",
          description: `O campo ${label} precisa ser preenchido.`,
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    onSubmit({
      category,
      ...fields,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-[400px] p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-3">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={category}
              onValueChange={(value: ProductCategory) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Argolas">Argolas</SelectItem>
                <SelectItem value="Fivelas">Fivelas</SelectItem>
                <SelectItem value="Bombinhas">Bombinhas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {category !== "Bombinhas" && (
            <>
              <div>
                <Label htmlFor="numero">Número</Label>
                <Select
                  value={fields.numero}
                  onValueChange={(v) => handleChange("numero", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsMap[category].numero.map((num) => (
                      <SelectItem key={num} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="medida">Medida</Label>
                <Select
                  value={fields.medida}
                  onValueChange={(v) => handleChange("medida", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsMap[category].medida.map((med) => (
                      <SelectItem key={med} value={med}>
                        {med}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="polegada">Polegada</Label>
                <Select
                  value={fields.polegada}
                  onValueChange={(v) => handleChange("polegada", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsMap[category].polegada.map((pol) => (
                      <SelectItem key={pol} value={pol}>
                        {pol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Select
                  value={fields.modelo}
                  onValueChange={(v) => handleChange("modelo", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsMap[category].modelo.map((mod) => (
                      <SelectItem key={mod} value={mod}>
                        {mod}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="grossura">Espessura</Label>
                <Input
                  id="grossura"
                  value={fields.grossura}
                  onChange={(e) => handleChange("grossura", e.target.value)}
                />
              </div>
            </>
          )}

          {category === "Bombinhas" && (
            <>
              <div>
                <Label htmlFor="compFuro">Comp. Furo</Label>
                <Select
                  value={fields.compFuro}
                  onValueChange={(v) => handleChange("compFuro", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsMap.Bombinhas.compFuro.map((comp) => (
                      <SelectItem key={comp} value={comp}>
                        {comp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="furo">Furo</Label>
                <Input
                  id="furo"
                  value={fields.furo}
                  onChange={(e) => handleChange("furo", e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="valor">Valor Unit.</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={fields.valor}
              onChange={(e) => handleChange("valor", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="quantidade">Qtd.</Label>
            <Input
              id="quantidade"
              type="number"
              value={fields.quantidade}
              onChange={(e) => handleChange("quantidade", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="stock">Estoque</Label>
            <Input
              id="stock"
              type="number"
              value={fields.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{initialData ? "Atualizar" : "Salvar"}</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;
