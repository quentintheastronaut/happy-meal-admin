export default (state: any) => {
  const { measurement, loading } = state;

  return {
    measurementList: measurement.measurementList,
    pageCount: measurement.pageCount,
    params: measurement.params,
    loadingFetchMeasurementList: loading.effects['measurement/fetchMeasurementList'],
  };
};
