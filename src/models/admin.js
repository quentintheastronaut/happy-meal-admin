import { queryDish } from '@/services/dish';

export default {
  namespace: 'admin',
  state: {
    dishList: [],
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(login, payload);
        if (!response.meta.ok) {
          notification.error({
            message: response.message,
          });
          return false;
        }
      } catch (error) {
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
  },
};
