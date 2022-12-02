import request from '@/ultis/request';

export async function login(body: API.LoginParams) {
  return request('/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: body.username,
      password: body.password,
    },
  });
}
