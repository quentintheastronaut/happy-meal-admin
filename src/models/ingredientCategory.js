import {
  createIngredientCategory,
  deleteIngredientCategory,
  queryIngredientCategory,
  updateIngredientCategory,
} from '@/services/ingredientCategory';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'ingredientCategory',
  state: {
    ingredientCategoryList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.DESC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchIngredientCategoryList({ payload }, { call, put, select }) {
      try {
        const ingredientCategory = yield select((state) => state.ingredientCategory);
        const response = yield call(queryIngredientCategory, payload || ingredientCategory.params);
        yield put({
          type: 'saveIngredientCategoryList',
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
        yield put({ type: 'fetchIngredientCategoryList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteIngredientCategory({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteIngredientCategory, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createIngredientCategory({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createIngredientCategory, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateIngredientCategory({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateIngredientCategory, payload);
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
    saveIngredientCategoryList(state, action) {
      state.ingredientCategoryList = action.payload;
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
