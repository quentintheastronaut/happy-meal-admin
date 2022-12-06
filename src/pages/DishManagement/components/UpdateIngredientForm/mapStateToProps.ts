export default (state: any) => {
  const { ingredient, loading, measurement } = state;

  return {
    ingredientList: ingredient.ingredientList,
    params: ingredient.params,
    measurementList: measurement.measurementList,
    loadingFetchIngredientList: loading.effects['ingredient/fetchIngredientList'],
  };
};
