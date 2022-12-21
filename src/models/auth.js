import { getProfile, signin } from '@/services/auth';
import { removeToken, setToken } from '@/ultis/authority';
import { ACCOUNT_ROLE } from '@/ultis/constants';
import { message, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import { history } from 'umi';

export default {
  namespace: 'auth',
  state: {
    currentAdmin: {
      id: 0,
      email: '',
    },
    profile: {},
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(signin, payload);
        const decodedToken = jwtDecode(response?.data?.accessToken);
        const { role } = decodedToken;
        if (role === ACCOUNT_ROLE.ADMIN) {
          console.log(role);
          yield put({
            type: 'changeLoginStatus',
            payload: response && response.data.accessToken,
          });
          yield put(history.replace('/'));
        } else {
          notification.error({
            message: 'This account is unauthorized !',
          });
        }
      } catch (error) {
        return false;
      }
      return true;
    },
    *logout(_, { put }) {
      try {
        removeToken();
        yield put(history.replace('/login'));
      } catch (error) {
        return false;
      }
      return true;
    },
    *fetchProfile(_, { call, put }) {
      try {
        const response = yield call(getProfile);
        yield put({
          type: 'saveProfile',
          payload: response?.data,
        });
      } catch (error) {
        return false;
      }
      return true;
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const auth = jwt_decode(payload);
      const { id: sub, email } = auth;
      setToken(payload);
      return {
        ...state,
        sub,
        email,
      };
    },
    saveProfile(state, { payload }) {
      state.profile = payload;
      return state;
    },
  },
};
