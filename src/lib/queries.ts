import { Product, ProductCategory, NewProduct } from "./types";

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Load products from localStorage
const loadFromStorage = (): Product[] => {
  const stored = localStorage.getItem("products");
  if (!stored) {
    // Initialize with empty array if no products exist
    localStorage.setItem("products", JSON.stringify([]));
    return [];
  }
  return JSON.parse(stored);
};

// Save products to localStorage
const saveToStorage = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export async function fetchProducts() {
  return loadFromStorage();
}

export async function addProduct(product: NewProduct): Promise<Product> {
  const products = loadFromStorage();
  const newProduct: Product = {
    ...product,
    id: generateId(),
    created_at: new Date().toISOString(),
    stock: 0,
    fields: {
      numero: product.fields.numero || "",
      medida: product.fields.medida || "",
      polegada: product.fields.polegada || "",
      modelo: product.fields.modelo || "",
      grossura: product.fields.grossura || "",
      compFuro: product.fields.compFuro || "",
      furo: product.fields.furo || "",
      valor: product.fields.valor,
    },
  };

  products.push(newProduct);
  saveToStorage(products);
  return newProduct;
}

export async function updateProduct(product: Product): Promise<Product> {
  const products = loadFromStorage();
  const index = products.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    products[index] = {
      ...product,
      fields: {
        numero: product.fields.numero || "",
        medida: product.fields.medida || "",
        polegada: product.fields.polegada || "",
        modelo: product.fields.modelo || "",
        grossura: product.fields.grossura || "",
        compFuro: product.fields.compFuro || "",
        furo: product.fields.furo || "",
        valor: product.fields.valor,
      },
    };
    saveToStorage(products);
    return products[index];
  }

  throw new Error("Product not found");
}

export async function deleteProduct(id: string) {
  const products = loadFromStorage();
  const filtered = products.filter((p) => p.id !== id);
  saveToStorage(filtered);
}
