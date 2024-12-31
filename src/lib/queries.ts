import { Product, ProductCategory } from "./types";

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

type NewProduct = {
  category: ProductCategory;
  fields: {
    numero?: string;
    medida?: string;
    polegada?: string;
    modelo?: string;
    grossura?: string;
    compFuro?: string;
    furo?: string;
    valor: number;
  };
  quantity: number;
};

export async function addProduct(product: NewProduct) {
  const products = loadFromStorage();
  const newProduct = {
    ...product,
    id: generateId(),
    created_at: new Date().toISOString(),
    stock: 0, // Initialize new products with 0 stock
  };

  products.push(newProduct);
  saveToStorage(products);
  return newProduct;
}

export async function updateProduct(product: Product) {
  const products = loadFromStorage();
  const index = products.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    products[index] = product;
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
