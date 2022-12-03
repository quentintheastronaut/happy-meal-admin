import { API } from './../ultis/constants';
import request from '@/ultis/request';

export async function queryMeasurement(payload: any) {
  const { page, limit, order, search } = payload;
  return request(`${API.MEASUREMENT_TYPE}`, {
    method: 'GET',
    params: {
      page,
      limit,
      order,
      search,
    },
  });
}

export async function updateMeasurement(payload: any) {
  const { id } = payload;
  return request(`${API.MEASUREMENT_TYPE}/${id}`, {
    method: 'PATCH',
    data: payload,
  });
}

export async function createMeasurement(payload: any) {
  return request(`${API.MEASUREMENT_TYPE}`, {
    method: 'POST',
    data: payload,
  });
}

export async function deleteMeasurement(payload: any) {
  const { id } = payload;
  return request(`${API.MEASUREMENT_TYPE}/${id}`, {
    method: 'DELETE',
  });
}
