import { supabase } from "./supabase";
import { Product, ProductCategory } from "./types";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  return data as Product[];
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
  stock: number;
};

export async function addProduct(product: NewProduct) {
  console.log("Adding product:", product);

  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          category: product.category,
          fields: product.fields,
          quantity: product.quantity,
          stock: product.stock || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding product:", error);
      throw error;
    }

    return data as Product;
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw error;
  }
}

export async function updateProduct(product: Product) {
  console.log("Updating product:", product);

  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        category: product.category,
        fields: product.fields,
        quantity: product.quantity,
        stock: product.stock || 0,
      })
      .eq("id", product.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }

    return data as Product;
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    throw error;
  }
}
