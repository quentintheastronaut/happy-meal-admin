import { API } from './../ultis/constants';
import request from '@/ultis/request';

export async function queryGroup(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.GROUP}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateGroup(payload: any) {
  const { id } = payload;
  return request(`${API.GROUP}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createGroup(payload: any) {
  return request(`${API.GROUP}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteGroup(payload: any) {
  const { id } = payload;
  return request(`${API.GROUP}/${id}`, {
    method: 'DELETE',
  });
}
