export default (state: any) => {
  const { user, loading } = state;

  return {
    userList: user.userList,
    pageCount: user.pageCount,
    params: user.params,
    loadingFetchUserList: loading.effects['user/fetchUserList'],
  };
};
