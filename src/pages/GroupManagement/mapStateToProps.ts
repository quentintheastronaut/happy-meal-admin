export default (state: any) => {
  const { group, loading } = state;

  return {
    groupList: group.groupList,
    pageCount: group.pageCount,
    params: group.params,
    loadingFetchGroupList: loading.effects['group/fetchGroupList'],
  };
};
