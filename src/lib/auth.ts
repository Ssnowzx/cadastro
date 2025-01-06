// Simple password-based authentication for admin access
const ADMIN_PASSWORD = "adm123";

export async function signIn(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new Error("Senha incorreta");
  }

  // Store auth state in localStorage
  localStorage.setItem("isAdmin", "true");
  return true;
}

export async function signOut() {
  localStorage.removeItem("isAdmin");
  return true;
}

export async function getCurrentUser() {
  return localStorage.getItem("isAdmin") === "true";
}

export async function checkIsAdmin() {
  // Limpar o localStorage ao iniciar para evitar login automático
  localStorage.removeItem("isAdmin");
  return false;
}
