export default (state: any) => {
  const { foodCategory, loading } = state;

  return {
    foodCategoryList: foodCategory.foodCategoryList,
    pageCount: foodCategory.pageCount,
    params: foodCategory.params,
    loadingFetchFoodCategoryList: loading.effects['foodCategory/fetchFoodCategoryList'],
  };
};
