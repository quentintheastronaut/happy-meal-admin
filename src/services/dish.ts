import { API } from './../ultis/constants';
import request from '@/ultis/request';

export async function queryDish(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.DISH}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateDish(payload: any) {
  const { id } = payload;
  return request(`${API.DISH}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createDish(payload: any) {
  return request(`${API.DISH}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteDish(payload: any) {
  const { id } = payload;
  return request(`${API.DISH}/${id}`, {
    method: 'DELETE',
  });
}

export async function getIngredients(payload: any) {
  const { id } = payload;
  return request(`${API.DISH}/ingredient/${id}`, {
    method: 'GET',
  });
}

export async function addIngredient(payload: any) {
  return request(`${API.DISH}/add-ingredient`, {
    method: 'POST',
    data: payload,
  });
}

export async function updateIngredient(payload: any) {
  return request(`${API.DISH}/update-ingredient`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function removeIngredient(payload: any) {
  const { id } = payload;
  return request(`${API.DISH}/remove-ingredient/${id}`, {
    method: 'DELETE',
  });
}
