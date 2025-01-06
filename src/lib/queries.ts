import { Product, ProductCategory, ProductFormData } from "./types";
import { supabase } from "./supabase";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      throw new Error("Erro ao carregar produtos");
    }
    return data || [];
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw new Error("Erro ao carregar produtos");
  }
}

export async function fetchCategoryStocks(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from("category_stocks")
      .select("category,stock");

    if (error) {
      console.error("Error fetching stocks:", error);
      throw new Error("Erro ao carregar estoques");
    }
    return data || [];
  } catch (error) {
    console.error("Error in fetchCategoryStocks:", error);
    throw new Error("Erro ao carregar estoques");
  }
}

export async function updateCategoryStock(
  category: ProductCategory,
  newStock: number,
): Promise<void> {
  try {
    const { error } = await supabase
      .from("category_stocks")
      .update({ stock: newStock })
      .eq("category", category);

    if (error) {
      console.error("Error updating stock:", error);
      throw new Error("Erro ao atualizar estoque");
    }
  } catch (error) {
    console.error("Error in updateCategoryStock:", error);
    throw new Error("Erro ao atualizar estoque");
  }
}

export async function getCategoryStock(
  category: ProductCategory,
): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("category_stocks")
      .select("stock")
      .eq("category", category)
      .single();

    if (error) {
      console.error("Error getting stock:", error);
      return 1000; // Valor padrão se houver erro
    }

    return data?.stock || 1000;
  } catch (error) {
    console.error("Error in getCategoryStock:", error);
    return 1000; // Valor padrão em caso de erro
  }
}

export async function addProduct(
  productData: ProductFormData,
): Promise<Product> {
  try {
    // Primeiro verifica o estoque
    const currentStock = await getCategoryStock(productData.category);
    if (currentStock < productData.quantity) {
      throw new Error(`Estoque insuficiente. Disponível: ${currentStock}`);
    }

    // Adiciona o produto
    const { data, error: insertError } = await supabase
      .from("products")
      .insert([
        {
          category: productData.category,
          fields: productData.fields,
          quantity: productData.quantity,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting product:", insertError);
      throw new Error("Erro ao adicionar produto");
    }

    // Atualiza o estoque
    const { error: updateError } = await supabase
      .from("category_stocks")
      .update({ stock: currentStock - productData.quantity })
      .eq("category", productData.category);

    if (updateError) {
      console.error("Error updating stock:", updateError);
      throw new Error("Erro ao atualizar estoque");
    }

    return data;
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw error;
  }
}

export async function updateProduct(product: Product): Promise<Product> {
  try {
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

    if (error) {
      console.error("Error updating product:", error);
      throw new Error("Erro ao atualizar produto");
    }

    return data;
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw new Error("Erro ao atualizar produto");
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw new Error("Erro ao excluir produto");
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    throw new Error("Erro ao excluir produto");
  }
}
