export default (state: any) => {
  const { ingredient, loading } = state;

  return {
    ingredientList: ingredient.ingredientList,
    pageCount: ingredient.pageCount,
    params: ingredient.params,
    loadingFetchIngredientList: loading.effects['ingredient/fetchIngredientList'],
  };
};
