import { API } from '@/ultis/constants';
import request from '@/ultis/request';

export async function queryIncompatible(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.INCOMPATIBLE}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateIncompatible(payload: any) {
  const { id } = payload;
  return request(`${API.INCOMPATIBLE}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createIncompatible(payload: any) {
  return request(`${API.INCOMPATIBLE}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteIncompatible(payload: any) {
  const { id } = payload;
  return request(`${API.INCOMPATIBLE}/${id}`, {
    method: 'DELETE',
  });
}
