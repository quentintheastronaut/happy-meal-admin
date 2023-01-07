import {
  createFoodCategory,
  deleteFoodCategory,
  queryFoodCategory,
  updateFoodCategory,
} from '@/services/foodCategory';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'foodCategory',
  state: {
    foodCategoryList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.ASC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchFoodCategoryList({ payload }, { call, put, select }) {
      try {
        const foodCategory = yield select((state) => state.foodCategory);
        const response = yield call(queryFoodCategory, payload || foodCategory.params);
        yield put({
          type: 'saveFoodCategoryList',
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
        yield put({ type: 'fetchFoodCategoryList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteFoodCategory({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteFoodCategory, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createFoodCategory({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createFoodCategory, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateFoodCategory({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateFoodCategory, payload);
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
    saveFoodCategoryList(state, action) {
      state.foodCategoryList = action.payload;
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
