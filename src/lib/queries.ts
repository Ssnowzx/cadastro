import { Product, ProductCategory, ProductFormData } from "./types";

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

export async function addProduct(
  productData: ProductFormData,
): Promise<Product> {
  const products = loadFromStorage();
  const newProduct: Product = {
    id: generateId(),
    category: productData.category,
    fields: {
      numero: productData.fields.numero,
      medida: productData.fields.medida,
      polegada: productData.fields.polegada,
      modelo: productData.fields.modelo,
      grossura: productData.fields.grossura,
      compFuro: productData.fields.compFuro,
      furo: productData.fields.furo,
      valor: productData.fields.valor,
    },
    quantity: productData.quantity,
    stock: 0,
    created_at: new Date().toISOString(),
  };

  products.push(newProduct);
  saveToStorage(products);
  return newProduct;
}

export async function updateProduct(product: Product): Promise<Product> {
  const products = loadFromStorage();
  const index = products.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    const updatedProduct: Product = {
      ...product,
      fields: {
        numero: product.fields.numero,
        medida: product.fields.medida,
        polegada: product.fields.polegada,
        modelo: product.fields.modelo,
        grossura: product.fields.grossura,
        compFuro: product.fields.compFuro,
        furo: product.fields.furo,
        valor: product.fields.valor,
      },
      stock: typeof product.stock === "number" ? product.stock : 0,
    };
    products[index] = updatedProduct;
    saveToStorage(products);
    return updatedProduct;
  }

  throw new Error("Product not found");
}

export async function deleteProduct(id: string) {
  const products = loadFromStorage();
  const filtered = products.filter((p) => p.id !== id);
  saveToStorage(filtered);
}
