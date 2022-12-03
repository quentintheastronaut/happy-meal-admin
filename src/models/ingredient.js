import {
  createIngredient,
  deleteIngredient,
  queryIngredient,
  updateIngredient,
} from '@/services/ingredient';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'ingredient',
  state: {
    ingredientList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.ASC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchIngredientList({ payload }, { call, put, select }) {
      try {
        const ingredient = yield select((state) => state.ingredient);
        const response = yield call(queryIngredient, payload || ingredient.params);
        yield put({
          type: 'saveIngredientList',
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
        yield put({ type: 'fetchIngredientList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteIngredient({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteIngredient, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createIngredient({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createIngredient, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateIngredient({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateIngredient, payload);
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
    saveIngredientList(state, action) {
      state.ingredientList = action.payload;
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
