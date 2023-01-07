import { API } from '@/ultis/constants';
import request from '@/ultis/request';

export async function queryFoodCategory(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.FOOD_CATEGORY}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateFoodCategory(payload: any) {
  const { id } = payload;
  return request(`${API.FOOD_CATEGORY}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createFoodCategory(payload: any) {
  return request(`${API.FOOD_CATEGORY}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteFoodCategory(payload: any) {
  const { id } = payload;
  return request(`${API.FOOD_CATEGORY}/${id}`, {
    method: 'DELETE',
  });
}
