import { API } from '@/ultis/constants';
import request from '@/ultis/request';

export async function queryIngredientCategory(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.INGREDIENT_CATEGORY}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateIngredientCategory(payload: any) {
  const { id } = payload;
  return request(`${API.INGREDIENT_CATEGORY}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createIngredientCategory(payload: any) {
  return request(`${API.INGREDIENT_CATEGORY}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteIngredientCategory(payload: any) {
  const { id } = payload;
  return request(`${API.INGREDIENT_CATEGORY}/${id}`, {
    method: 'DELETE',
  });
}
