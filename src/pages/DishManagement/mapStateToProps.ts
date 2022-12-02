export default (state: any) => {
  const { dish, loading } = state;

  return {
    dishList: dish.dishList,
    pageCount: dish.pageCount,
    params: dish.params,
    loadingFetchDishList: loading.effects['dish/fetchDishList'],
  };
};
