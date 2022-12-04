import { API } from './../ultis/constants';
import request from '@/ultis/request';

export async function signin(payload: any) {
  return request(`${API.AUTH}/signin`, {
    method: 'POST',
    data: payload,
  });
}

export async function sigup(payload: any) {
  return request(`${API.AUTH}/signup`, {
    method: 'POST',
    data: payload,
  });
}

export async function getProfile() {
  return request(`${API.USER}/profile`, {
    method: 'GET',
  });
}
