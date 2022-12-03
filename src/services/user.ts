import { API } from './../ultis/constants';
import request from '@/ultis/request';

export async function queryUser(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.USER}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateUser(payload: any) {
  const { id } = payload;
  return request(`${API.USER}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createUser(payload: any) {
  return request(`${API.USER}`, {
    method: 'POST',
    data: payload,
  });
}

export async function activateUser(payload: any) {
  const { id } = payload;
  return request(`${API.USER}/activate/${id}`, {
    method: 'PATCH',
  });
}

export async function deactivateUser(payload: any) {
  const { id } = payload;
  return request(`${API.USER}/deactivate/${id}`, {
    method: 'PATCH',
  });
}
