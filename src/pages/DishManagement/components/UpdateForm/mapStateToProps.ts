export default (state: any) => {
  const { dish, loading } = state;

  return {
    ingredients: dish.ingredients,
    loadingFetchIngredient: loading.effects['dish/fetchIngredient'],
  };
};
