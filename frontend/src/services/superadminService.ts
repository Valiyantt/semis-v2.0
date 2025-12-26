import api from './api';

export type SuperAdmin = {
  superAdminId?: number;
  fullName: string;
  email: string;
  passwordHash?: string;
};

const basePath = 'SuperAdmin';

export async function getAll() {
  const res = await api.get<SuperAdmin[]>(basePath);
  return res.data;
}

export async function getById(id: number) {
  const res = await api.get<SuperAdmin>(`${basePath}/${id}`);
  return res.data;
}

export async function create(payload: Partial<SuperAdmin>) {
  const res = await api.post<SuperAdmin>(basePath, payload);
  return res.data;
}

export async function update(id: number, payload: Partial<SuperAdmin>) {
  const res = await api.put(`${basePath}/${id}`, payload);
  return res.data;
}

export async function remove(id: number) {
  const res = await api.delete(`${basePath}/${id}`);
  return res.data;
}
