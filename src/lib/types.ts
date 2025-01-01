export type ProductCategory = "Argolas" | "Fivelas" | "Bombinhas";

export interface ProductFields {
  numero: string;
  medida: string;
  polegada: string;
  modelo: string;
  grossura: string;
  compFuro: string;
  furo: string;
  valor: number;
}

export interface Product {
  id: string;
  category: ProductCategory;
  fields: ProductFields;
  quantity: number;
  created_at?: string;
}

export interface CategoryStock {
  category: ProductCategory;
  stock: number;
}

export interface ProductFormData {
  category: ProductCategory;
  fields: {
    numero: string;
    medida: string;
    polegada: string;
    modelo: string;
    grossura: string;
    compFuro: string;
    furo: string;
    valor: number;
  };
  quantity: number;
}

export const optionsMap = {
  Argolas: {
    numero: ["20", "25", "30", "40", "45", "50", "55", "60", "65"],
    medida: [
      "20 mm",
      "25 mm",
      "30 mm",
      "40 mm",
      "45 mm",
      "50 mm",
      "55 mm",
      "60 mm",
      "65 mm",
    ],
    polegada: ["3/16", "1/4", "5/16"],
    modelo: ["Redonda", "Chata"],
  },
  Fivelas: {
    numero: ["15", "20", "25", "30", "35", "40"],
    medida: ["15x33", "20x33", "25x41", "30x43", "35x53", "40x54"],
    polegada: ["3/16", "1/4", "5/16"],
    modelo: ["Redonda", "Chata"],
  },
  Bombinhas: {
    numero: [],
    medida: [],
    polegada: [],
    compFuro: ["0,5x", "10x", "15x", "25x"],
  },
};
