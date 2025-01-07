import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zlpceepwdhdrpvdvitol.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscGNlZXB3ZGhkcnB2ZHZpdG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxODcyNzksImV4cCI6MjA1MDc2MzI3OX0.OwDOXTEGjNpJtGgpEYGYPqD0mfqm1qzPGYhj4NrDwjU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
