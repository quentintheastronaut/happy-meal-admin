import {
  createMeasurement,
  deleteMeasurement,
  queryMeasurement,
  updateMeasurement,
} from '@/services/measurement';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'measurement',
  state: {
    measurementList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.ASC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchMeasurementList({ payload }, { call, put, select }) {
      try {
        const measurement = yield select((state) => state.measurement);
        const response = yield call(queryMeasurement, payload || measurement.params);
        yield put({
          type: 'saveMeasurementList',
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
        yield put({ type: 'fetchMeasurementList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteMeasurement({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteMeasurement, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createMeasurement({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createMeasurement, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateMeasurement({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateMeasurement, payload);
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
    saveMeasurementList(state, action) {
      state.measurementList = action.payload;
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
