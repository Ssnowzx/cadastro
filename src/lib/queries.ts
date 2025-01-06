import { Product, ProductCategory, ProductFormData } from "./types";
import { supabase } from "./supabase";

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Erro ao carregar produtos");
  return data || [];
}

export async function fetchCategoryStocks(): Promise<any[]> {
  const { data, error } = await supabase
    .from("category_stocks")
    .select("category,stock");

  if (error) throw new Error("Erro ao carregar estoques");
  return data || [];
}

export async function updateCategoryStock(
  category: ProductCategory,
  newStock: number,
): Promise<void> {
  const { error } = await supabase
    .from("category_stocks")
    .update({ stock: newStock })
    .eq("category", category);

  if (error) throw new Error("Erro ao atualizar estoque");
}

export async function getCategoryStock(
  category: ProductCategory,
): Promise<number> {
  const { data, error } = await supabase
    .from("category_stocks")
    .select("stock")
    .eq("category", category)
    .single();

  if (error) {
    // Se não encontrar, retorna o estoque padrão
    if (error.code === "PGRST116") return 1000;
    throw new Error("Erro ao obter estoque");
  }
  return data?.stock || 0;
}

export async function addProduct(
  productData: ProductFormData,
): Promise<Product> {
  // Primeiro verifica o estoque
  const currentStock = await getCategoryStock(productData.category);
  if (currentStock < productData.quantity) {
    throw new Error(`Estoque insuficiente. Disponível: ${currentStock}`);
  }

  // Adiciona o produto
  const { data, error } = await supabase
    .from("products")
    .insert({
      category: productData.category,
      fields: productData.fields,
      quantity: productData.quantity,
    })
    .select()
    .single();

  if (error) throw new Error("Erro ao adicionar produto");

  // Atualiza o estoque
  await updateCategoryStock(
    productData.category,
    currentStock - productData.quantity,
  );

  return data;
}

export async function updateProduct(product: Product): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update({
      category: product.category,
      fields: product.fields,
      quantity: product.quantity,
    })
    .eq("id", product.id)
    .select()
    .single();

  if (error) throw new Error("Erro ao atualizar produto");
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error("Erro ao excluir produto");
}
