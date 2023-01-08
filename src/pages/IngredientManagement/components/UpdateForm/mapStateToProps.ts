export default (state: any) => {
  const { ingredient, loading, ingredientCategory } = state;

  return {
    params: ingredientCategory.params,
    incompatibles: ingredient.incompatibles,
    ingredientCategoryList: ingredientCategory.ingredientCategoryList,
    loadingFetchIncompatibles: loading.effects['ingredient/fetchIncompatibles'],
    loadingFetchIngredientCategory: loading.effects['ingredientCategory/fetchIngredientCategory'],
  };
};
