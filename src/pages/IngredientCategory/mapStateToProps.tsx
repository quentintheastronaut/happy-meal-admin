export default (state: any) => {
  const { ingredientCategory, loading } = state;

  return {
    ingredientCategoryList: ingredientCategory.ingredientCategoryList,
    pageCount: ingredientCategory.pageCount,
    params: ingredientCategory.params,
    loadingFetchIngredientCategoryList:
      loading.effects['ingredientCategory/fetchIngredientCategoryList'],
  };
};
