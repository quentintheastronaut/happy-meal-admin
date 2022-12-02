import { createDish, deleteDish, queryDish, updateDish } from '@/services/dish';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'dish',
  state: {
    dishList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.ASC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchDishList({ payload }, { call, put, select }) {
      try {
        if (!payload) {
          const dish = yield select((state) => state.dish);
          payload = dish.params;
        }
        const response = yield call(queryDish, payload);
        yield put({
          type: 'saveDishList',
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
        yield put({ type: 'fetchDishList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteDish({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteDish, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createDish({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createDish, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateDish({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateDish, payload);
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
    saveDishList(state, action) {
      state.dishList = action.payload;
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
