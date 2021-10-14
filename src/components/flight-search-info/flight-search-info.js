import React from 'react';
import './flight-search-info.css';

export const FlightSearchInfo = (props) => {
  const { origin, destination, date, returnDate } = props.criteria;
  return (
    <section className="flight-search-info">
      <div className='flight-info'>
        {!returnDate ? <h3>{`${origin} > ${destination}`}</h3> : <h3>{`${origin} > ${destination} > ${origin}`}</h3>}
        <p>{props.count} flights found, {date}</p>
      </div>
      <div className='flight-time'>
        <div className='date'>Depart: {date}</div>
        {returnDate && <div className='date'>Return: {returnDate}</div>}
      </div>
    </section>
  )
}