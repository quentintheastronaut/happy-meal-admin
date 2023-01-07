import { createLocation, deleteLocation, queryLocation, updateLocation } from '@/services/location';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'location',
  state: {
    locationList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.ASC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchLocationList({ payload }, { call, put, select }) {
      try {
        const location = yield select((state) => state.location);
        const response = yield call(queryLocation, payload || location.params);
        yield put({
          type: 'saveLocationList',
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
        yield put({ type: 'fetchLocationList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteLocation({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteLocation, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createLocation({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createLocation, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateLocation({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateLocation, payload);
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
    saveLocationList(state, action) {
      state.locationList = action.payload;
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
