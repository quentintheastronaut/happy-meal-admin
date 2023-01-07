import { API } from '@/ultis/constants';
import request from '@/ultis/request';

export async function queryLocation(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.LOCATION}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateLocation(payload: any) {
  const { id } = payload;
  return request(`${API.LOCATION}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createLocation(payload: any) {
  return request(`${API.LOCATION}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteLocation(payload: any) {
  const { id } = payload;
  return request(`${API.LOCATION}/${id}`, {
    method: 'DELETE',
  });
}
