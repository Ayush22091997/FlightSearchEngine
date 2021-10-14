import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import nonStopFlightLogo from './../../assets/nonstop.png';
import './flight-info.css';
import { connect } from 'react-redux';

const FlightLogo = (props) => {
  return <img src={nonStopFlightLogo} width="100" height="100"></img>
}

const FlightInfo = (props) => {
  const { name, flightNo, departureTime, origin, arrivalTime, destination, price, date } = props.data;
  const { returnDate } = props.criteria;
  const timeDiffStart = new Date(`${date} ${arrivalTime}`) - new Date(`${date} ${departureTime}`);

  const getTimeDifferece = (timeDiff) => {
    const timeInHrs = Math.floor((timeDiff) / 3600000);
    const timeInMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
    return `${timeInHrs}h ${timeInMins}m`;
  }
  return (
    !!returnDate ? props.routes.return.nonStopFlights.map(value => {

      const timeDiff = new Date(`${date} ${arrivalTime}`) - new Date(`${date} ${departureTime}`);
      return <Card>
        <section className='Flight-info'>
          <div className='left-container'>
            <div className='flight-name'>{name}</div>
            <div className='price-header'>Rs. {price}</div>
            <div className='flight-details'>
              <div className='flight'>
                <div className='flight-no'>{flightNo}</div>
                <div className='flight-journey'>{origin.split('(')[1].slice(0, 3)} > {destination.split('(')[1].slice(0, 3)}</div>
                <div className="time">Depart: {departureTime}</div>
                <div className="time">Arrive: {arrivalTime}</div>
                <div className="time"> Total Duration: {getTimeDifferece(timeDiffStart)}</div>
              </div>
            </div>
          </div>
          {returnDate && <div className='left-container'>
            <div className='flight-name'>{value.name}</div>
            <div className='price-header'>Rs. {value.price}</div>
            <div className='flight-details'>
              <div className='flight'>
                <div className='flight-no'>{value.flightNo}</div>
                <div className='flight-journey'>{value.origin.split('(')[1].slice(0, 3)} > {value.destination.split('(')[1].slice(0, 3)}</div>
                <div className="time">Depart: {value.departureTime}</div>
                <div className="time">Arrive: {value.arrivalTime}</div>
                <div className="time"> Total Duration: {getTimeDifferece(timeDiff)}</div>
              </div>
            </div>
          </div>}
          <div className='right-container'>
            <FlightLogo></FlightLogo>
            {<Button variant="outline-danger">Book</Button>}
          </div>
        </section>
      </Card>
    }) : (
      <Card>
        <section className='Flight-info'>
          <div className='left-container'>
            <div className='flight-name'>{name}</div>
            <div className='price-header'>Rs. {price}</div>
            <div className='flight-details'>
              <div className='flight'>
                <div className='flight-no'>{flightNo}</div>
                <div className='flight-journey'>{origin.split('(')[1].slice(0, 3)} > {destination.split('(')[1].slice(0, 3)}</div>
                <div className="time">Depart: {departureTime}</div>
                <div className="time">Arrive: {arrivalTime}</div>
                <div className="time"> Total Duration: {getTimeDifferece(timeDiffStart)}</div>
              </div>
            </div>
          </div>
          <div className='right-container'>
            <FlightLogo></FlightLogo>
            {<Button style={{marginTop:'10px'}} variant="outline-danger">Book this flight</Button>}
          </div>
        </section>
      </Card>
    )
  )
}
const mapStateToProps = (state) => ({
  flights: state.flights,
  routes: state.routes,
  filters: state.filters
})

export default connect(mapStateToProps)(FlightInfo)