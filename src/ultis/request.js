import { notification } from 'antd';
import { getDvaApp, history } from 'umi';
import { extend } from 'umi-request';
import { getToken } from './authority';

const errorHandler = async (error) => {
  const body = await error.response.json();
  const { response = {} } = error;
  const { status } = response;

  // 400 Bad request
  if (status === 400) {
    notification.error({
      message: `${body?.message || body?.error}`,
    });
  }
  // 401 Unauthorized
  if (status === 401) {
    getDvaApp()._store.dispatch({
      type: 'login/logout',
    });
    notification.error({
      message: `${body?.message || body?.error}`,
    });
  }
  // 403 Forbidden
  if (status === 403) {
    notification.error({
      // message: `${body?.message || body?.error}`,
      message: "You don't have permission to access this service !",
    });
    history.push('/errors/403');
    return response;
    // Hot fix force user logout on OGeek
    // window.g_app._store.dispatch({
    //   type: 'user/logout',
    // });
  }
  // 404 Not found
  if (status === 404) {
    notification.error({
      // message: `${body?.message || body?.error}`,
      message: 'This service have been not served yet !',
    });
  }
  // 500 Internal Server Error
  if (status === 500) {
    notification.error({
      // message: `${body?.message || body?.error}`,
      message: 'Something went wrong! Please try again later.',
    });
  }

  throw error;
};

/**
 * App request
 */

export const request = (...args) =>
  extend({
    prefix: API_URL,
    credentials: 'include',
    errorHandler: errorHandler, // Inject error handling
    headers: { Authorization: `Bearer ${getToken()}` },
  })(...args);

export default request;
