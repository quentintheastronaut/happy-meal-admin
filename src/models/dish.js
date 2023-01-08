import {
  createDish,
  deleteDish,
  queryDish,
  updateDish,
  getIngredients,
  updateIngredient,
  addIngredient,
  removeIngredient,
} from '@/services/dish';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'dish',
  state: {
    dishList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.DESC,
      search: null,
    },
    pageCount: 0,
    ingredients: [],
    currentDishId: 0,
  },
  effects: {
    *fetchDishList({ payload }, { call, put, select }) {
      try {
        const dish = yield select((state) => state.dish);
        const response = yield call(queryDish, payload || dish.params);
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

    *saveCurrentDishId({ payload }, { put }) {
      try {
        if (!payload) return;
        yield put({ type: 'setCurrentDishId', payload });
        yield put({ type: 'refreshIngredient' });
      } catch (error) {
        notification.error({ message: error.message });
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

    // Ingredients
    *refreshIngredient(_, { put }) {
      try {
        yield put({ type: 'fetchIngredient' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *fetchIngredient({ payload }, { call, put, select }) {
      try {
        const currentDishId = yield select((state) => state.dish.currentDishId);
        const response = yield call(getIngredients, payload || { id: currentDishId });
        yield put({
          type: 'saveIngredients',
          payload: response?.data,
        });
      } catch (error) {
        return false;
      }
      return true;
    },

    *updateIngredient({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateIngredient, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refreshIngredient' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *addIngredient({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(addIngredient, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refreshIngredient' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *removeIngredient({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(removeIngredient, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refreshIngredient' });
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
    saveIngredients(state, action) {
      state.ingredients = action.payload;
      return state;
    },
    setCurrentDishId(state, action) {
      state.currentDishId = action.payload;
      return state;
    },
  },
};
