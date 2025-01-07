import { createClient } from "@supabase/supabase-js";

// Use valores diretos em vez de variáveis de ambiente
const supabaseUrl = "https://hcskkfedldemllhpvnhq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc2trZmVkbGRlbWxsaHB2bmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNDIxODcsImV4cCI6MjA1MDgxODE4N30.GX3BMw6yZrToyqIg5w4JWbrTtWBgKm3Aweo7a3lNU-A";

console.log("Initializing Supabase with URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
