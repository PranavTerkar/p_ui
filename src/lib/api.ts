const API_BASE = "/api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

export const login = (email: string, password: string) =>
  request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (name: string, email: string, password: string) =>
  request<AuthUser>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const getUsers = (token: string) =>
  request<AuthUser[]>("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
