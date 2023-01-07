export default (state: any) => {
  const { location, loading } = state;

  return {
    locationList: location.locationList,
    pageCount: location.pageCount,
    params: location.params,
    loadingFetchLocationList: loading.effects['location/fetchLocationList'],
  };
};
