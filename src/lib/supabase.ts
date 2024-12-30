import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing environment variables:");
  console.error("VITE_SUPABASE_URL:", supabaseUrl);
  console.error("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey);
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
  db: {
    schema: "public",
  },
});

// Test the connection
supabase
  .from("products")
  .select("*")
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error("Supabase connection test failed:", error);
    } else {
      console.log(
        "Supabase connection successful, found",
        data?.length || 0,
        "products",
      );
    }
  });
