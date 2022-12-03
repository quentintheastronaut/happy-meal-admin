import { createGroup, deleteGroup, queryGroup, updateGroup } from '@/services/group';
import { ORDER } from '@/ultis/constants';
import { notification } from 'antd';

export default {
  namespace: 'group',
  state: {
    groupList: [],
    params: {
      page: 1,
      limit: 10,
      order: ORDER.ASC,
      search: null,
    },
    pageCount: 0,
  },
  effects: {
    *fetchGroupList({ payload }, { call, put, select }) {
      try {
        const group = yield select((state) => state.group);
        const response = yield call(queryGroup, payload || group.params);
        yield put({
          type: 'saveGroupList',
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
        yield put({ type: 'fetchGroupList' });
      } catch (error) {
        return false;
      }
      return true;
    },

    *deleteGroup({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(deleteGroup, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *createGroup({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(createGroup, payload);
        notification.success({ message: 'Success' });
        yield put({ type: 'refresh' });
      } catch (error) {
        notification.error({ message: error.message });
        return false;
      }
      return true;
    },

    *updateGroup({ payload }, { call, put }) {
      try {
        if (!payload) return;
        yield call(updateGroup, payload);
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
    saveGroupList(state, action) {
      state.groupList = action.payload;
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
