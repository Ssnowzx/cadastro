import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zlpceepwdhdrpvdvitol.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscGNlZXB3ZGhkcnB2ZHZpdG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxODcyNzksImV4cCI6MjA1MDc2MzI3OX0.3yHAMjQdLvZdzztlAFj34gPWSzLnuKLMTNSRAkCr29E";

// Criar o cliente Supabase com configurações adicionais
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      apikey: supabaseAnonKey,
    },
  },
});
