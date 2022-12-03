import { API } from './../ultis/constants';
import request from '@/ultis/request';

export async function queryIngredient(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.INGREDIENT}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateIngredient(payload: any) {
  const { id } = payload;
  return request(`${API.INGREDIENT}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createIngredient(payload: any) {
  return request(`${API.INGREDIENT}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteIngredient(payload: any) {
  const { id } = payload;
  return request(`${API.INGREDIENT}/${id}`, {
    method: 'DELETE',
  });
}
