import { put, takeLatest, all } from 'redux-saga/effects';

function* findFlights(payload) {
  try {
    yield put({ type: "GET_FILTERS_SUCCESS", json: payload.payload.criteria });

    const { flights, criteria: { returnDate, origin, destination, departureDate, numOfPassengers, rangeValue } } = payload.payload;
    
    let list;
    let tempList = JSON.parse(JSON.stringify(flights))
    if (!!rangeValue && !!origin && !!destination) {
      list = tempList && tempList.onwards.nonStopFlights.filter(value => {
       
        return (value.price < rangeValue && value.origin === origin && value.destination === destination && value.date === departureDate)
      });

    
      tempList && tempList.onwards && (tempList.onwards.nonStopFlights = list);
    }
    if (!!rangeValue && !!origin && !!destination && !!returnDate) {
      list = tempList && tempList.return.nonStopFlights.filter(value => {
        return (value.price < rangeValue && value.origin === destination && value.destination === origin && value.date === returnDate)
      });

      tempList && tempList.return && (tempList.return.nonStopFlights = list);
    }

    !!origin && !!destination && (yield put({ type: "GET_ROUTES_SUCCESS", json: tempList && tempList }));
  } catch (e) {
    yield put({ type: "GET_ROUTES_FAIL", error: e });
  }

}

function* findFlightsWatcher() {
  yield takeLatest('GET_ROUTES', findFlights)
}

export default function* rootSaga() {
  yield all([
    findFlightsWatcher()
  ]);
}
