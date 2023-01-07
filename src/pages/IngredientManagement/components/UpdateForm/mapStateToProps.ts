export default (state: any) => {
  const { ingredient, loading } = state;

  return {
    incompatibles: ingredient.incompatibles,
    loadingFetchIncompatibles: loading.effects['ingredient/fetchIncompatibles'],
  };
};
