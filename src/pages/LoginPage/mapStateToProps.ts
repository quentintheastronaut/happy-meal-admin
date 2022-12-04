export default (state: any) => {
  const { loading } = state;

  return {
    loadingLogin: loading.effects['auth/login'],
  };
};
