import { createClient } from "@supabase/supabase-js";

// Usar as credenciais corretas do novo projeto
const supabaseUrl = "https://zlpceepwdhdrpvdvitol.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscGNlZXB3ZGhkcnB2ZHZpdG9sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTE4NzI3OSwiZXhwIjoyMDUwNzYzMjc5fQ.pO3dXqn_D7NILuqnFA0P58LcBQzmDn55qFjkJ6CtRGk";

console.log("Initializing Supabase with URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
