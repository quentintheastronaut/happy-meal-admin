import { activateUser, createUser, deactivateUser, queryUser, updateUser } from '@/services/user';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'user',
  state: {
    userList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.DESC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchUserList({ payload }, { call, put, select }) {
      try {
        const user = yield select((state) => state.user);
        const response = yield call(queryUser, payload || user.params);
        yield put({
          type: 'saveUserList',
          payload: response?.data,
        });
        yield put({
          type: 'savePageCount',
          payload: response?.query,
        });
      } catch (error) {
        return false;
      }
      return true;
    },
    *refresh(_, { put }) {
      try {
        yield put({ type: 'fetchUserList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *activateUser({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(activateUser, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },
    *deactivateUser({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deactivateUser, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createUser({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createUser, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateUser({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateUser, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },
    *saveParams({ payload }, { put }) {
      try {
        if (!payload) return;
        yield put({ type: 'setParams', payload });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },
  },
  reducers: {
    saveUserList(state, action) {
      state.userList = action.payload;
      return state;
    },
    savePageCount(state, action) {
      state.pageCount = action.payload.pageCount * action.payload.limit;
      return state;
    },
    setParams(state, action) {
      state.params = action.payload;
      return state;
    },
  },
};
