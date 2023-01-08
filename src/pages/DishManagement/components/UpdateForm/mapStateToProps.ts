export default (state: any) => {
  const { dish, loading, foodCategory } = state;

  return {
    params: foodCategory.params,
    ingredients: dish.ingredients,
    foodCategoryList: foodCategory.foodCategoryList,
    loadingFetchIngredient: loading.effects['dish/fetchIngredient'],
    loadingFetchFoodCategory: loading.effects['foodCategory/fetchFoodCategory'],
  };
};
