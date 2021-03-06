import React from 'react';
import './flight-grid.css';
import { FlightSearchInfo } from './../flight-search-info/flight-search-info';
import FlightInfo from './../flight-info/flight-info';


const FlightsGrid = (props) => {
  const flights = props.flights || {};
  const returnFlights = props.returnFlights || {};
  const flightsCount = (flights.nonStopFlights && flights.nonStopFlights.length) + (flights.multiStopFlights && flights.multiStopFlights.length)
  return (
    <div className="flights-info-container">
      {props.criteria && <FlightSearchInfo criteria={props.criteria} count={flightsCount || 0} />}
      {flights.nonStopFlights && flights.nonStopFlights.map(flight => <FlightInfo criteria={props.criteria} data={flight} />)}
    </div>
  );
}

export default FlightsGrid;

