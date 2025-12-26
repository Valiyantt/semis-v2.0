import api from './api';

export type LoginPayload = { username: string; password: string };
export type LoginResponse = { token: string; user: { id: string; username: string; role: string } };

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('auth/login', payload);
  const { token, user } = res.data;
  
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('authenticated', 'true');
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  return { token, user };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('authenticated');
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isAuthenticated() {
  return localStorage.getItem('authenticated') === 'true' && !!getToken();
}
