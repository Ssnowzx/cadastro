import {
  Product,
  ProductCategory,
  ProductFormData,
  CategoryStock,
} from "./types";

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Load products from localStorage
const loadFromStorage = (): Product[] => {
  const stored = localStorage.getItem("products");
  if (!stored) {
    localStorage.setItem("products", JSON.stringify([]));
    return [];
  }
  return JSON.parse(stored);
};

// Load category stocks from localStorage
const loadStocksFromStorage = (): CategoryStock[] => {
  const stored = localStorage.getItem("categoryStocks");
  if (!stored) {
    const initialStocks: CategoryStock[] = [
      { category: "Argolas", stock: 0 },
      { category: "Fivelas", stock: 0 },
      { category: "Bombinhas", stock: 0 },
    ];
    localStorage.setItem("categoryStocks", JSON.stringify(initialStocks));
    return initialStocks;
  }
  return JSON.parse(stored);
};

// Save products to localStorage
const saveToStorage = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

// Save category stocks to localStorage
const saveStocksToStorage = (stocks: CategoryStock[]) => {
  localStorage.setItem("categoryStocks", JSON.stringify(stocks));
};

export async function fetchProducts() {
  return loadFromStorage();
}

export async function fetchCategoryStocks() {
  return loadStocksFromStorage();
}

export async function updateCategoryStock(
  category: ProductCategory,
  newStock: number,
) {
  const stocks = loadStocksFromStorage();
  const updatedStocks = stocks.map((stock) =>
    stock.category === category ? { ...stock, stock: newStock } : stock,
  );
  saveStocksToStorage(updatedStocks);
  return updatedStocks;
}

export async function getCategoryStock(
  category: ProductCategory,
): Promise<number> {
  const stocks = loadStocksFromStorage();
  const categoryStock = stocks.find((stock) => stock.category === category);
  return categoryStock?.stock || 0;
}

export async function addProduct(
  productData: ProductFormData,
): Promise<Product> {
  const currentStock = await getCategoryStock(productData.category);

  if (currentStock < productData.quantity) {
    throw new Error("Estoque insuficiente para adicionar este produto");
  }

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
    created_at: new Date().toISOString(),
  };

  // Update stock
  await updateCategoryStock(
    productData.category,
    currentStock - productData.quantity,
  );

  products.push(newProduct);
  saveToStorage(products);
  return newProduct;
}

export async function updateProduct(product: Product): Promise<Product> {
  const products = loadFromStorage();
  const index = products.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    products[index] = product;
    saveToStorage(products);
    return product;
  }

  throw new Error("Product not found");
}

export async function deleteProduct(id: string) {
  const products = loadFromStorage();
  const product = products.find((p) => p.id === id);

  if (product) {
    // Return the quantity to stock when deleting
    const currentStock = await getCategoryStock(product.category);
    await updateCategoryStock(
      product.category,
      currentStock + product.quantity,
    );
  }

  const filtered = products.filter((p) => p.id !== id);
  saveToStorage(filtered);
}
